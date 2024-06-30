import {run} from '@subsquid/batch-processor'
import {augmentBlock} from '@subsquid/solana-objects'
import {DataSourceBuilder, SolanaRpcClient} from '@subsquid/solana-stream'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import assert from 'assert'
//import * as tokenProgram from './abi/token-program'
import * as jupiter from './abi/jupiter'
import * as tokenProgram from './abi/tokenProgram'
import * as raydium from './abi/raydium'
import { Exchange, SolTrade, TokenTrade, JupSignature } from './model'
import { DecodedInstruction } from './abi/abi.support'
import * as dotenv from 'dotenv';

dotenv.config();

const SOL_MINT = 'So11111111111111111111111111111111111111112';

// First we create a DataSource - component,
// that defines where to get the data and what data should we get.
const dataSource = new DataSourceBuilder()
    // Provide Subsquid Network Gateway URL.
    .setGateway('https://v2.archive.subsquid.io/network/solana-mainnet')
    // Subsquid Network is always about 1000 blocks behind the head.
    // We must use regular RPC endpoint to get through the last mile
    // and stay on top of the chain.
    // This is a limitation, and we promise to lift it in the future!
    .setRpc(process.env.SOLANA_NODE == null ? undefined : {
        client: new SolanaRpcClient({
            url: process.env.SOLANA_NODE,
            // rateLimit: 100 // requests per sec
        }),
        strideConcurrency: 20
    })
    // Currently only blocks from 240_000_000 and above are stored in Subsquid Network.
    // When we specify it, we must also limit the range of requested blocks.
    //
    // Same applies to RPC endpoint of a node that cleanups its history.
    //
    // NOTE, that block ranges are specified in heights, not in slots !!!
    //
    .setBlockRange({from: 240_000_000})
    //
    // Block data returned by the data source has the following structure:
    //
    // interface Block {
    //     header: BlockHeader
    //     transactions: Transaction[]
    //     instructions: Instruction[]
    //     logs: LogMessage[]
    //     balances: Balance[]
    //     tokenBalances: TokenBalance[]
    //     rewards: Reward[]
    // }
    //
    // For each block item we can specify a set of fields we want to fetch via `.setFields()` method.
    // Think about it as of SQL projection.
    //
    // Accurate selection of only required fields can have a notable positive impact
    // on performance when data is sourced from Subsquid Network.
    //
    // We do it below only for illustration as all fields we've selected
    // are fetched by default.
    //
    // It is possible to override default selection by setting undesired fields to `false`.
    .setFields({
        block: { // block header fields
            timestamp: true
        },
        transaction: { // transaction fields
            signatures: true,
            fee: true,
        },
        instruction: { // instruction fields
            programId: true,
            accounts: true,
            data: true,
            isCommitted: true,
            //logs: true,
        },
        tokenBalance: { // token balance record fields
            preAmount: true,
            postAmount: true,
            preOwner: true,
            postOwner: true
        },
        log: {
            message: true,
            kind: true,
            programId: true,
        }
    })
    // By default, block can be skipped if it doesn't contain explicitly requested items.
    //
    // We request items via `.addXxx()` methods.
    //
    // Each `.addXxx()` method accepts item selection criteria
    // and also allows to request related items.
    //

    .addInstruction({
        // select instructions, that:
        where: {
            programId: [jupiter.programId], // where executed by Whirlpool program
            d8: [jupiter.instructions.route.d8, jupiter.instructions.sharedAccountsRoute.d8], // have first 8 bytes of .data equal to swap descriptor,
            isCommitted: true, // where successfully committed
            ...jupiter.instructions.route.accountSelection({tokenProgram: ['TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA']}),
            ...jupiter.instructions.sharedAccountsRoute.accountSelection({tokenProgram: ['TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA']})
        },
        // for each instruction selected above
        // make sure to also include:
        include: {
            innerInstructions: true, // inner instructions
            transaction: true, // transaction, that executed the given instruction
            transactionTokenBalances: true, // all token balance records of executed transaction
            //logs: true, // logs of the instruction
        }
    })
    .build()


// Once we've prepared a data source we can start fetching the data right away:
//
// for await (let batch of dataSource.getBlockStream()) {
//     for (let block of batch) {
//         console.log(block)
//     }
// }
//
// However, Subsquid SDK can also help to decode and persist the data.
//

// Data processing in Subsquid SDK is defined by four components:
//
//  1. Data source (such as we've created above)
//  2. Database
//  3. Data handler
//  4. Processor
//
// Database is responsible for persisting the work progress (last processed block)
// and for providing storage API to the data handler.
//
// Data handler is a user defined function which accepts consecutive block batches,
// storage API and is responsible for entire data transformation.
//
// Processor connects and executes above three components.
//

// Below we create a `TypeormDatabase`.
//
// It provides restricted subset of [TypeORM EntityManager API](https://typeorm.io/working-with-entity-manager)
// as a persistent storage interface and works with any Postgres-compatible database.
//
// Note, that we don't pass any database connection parameters.
// That's because `TypeormDatabase` expects a certain project structure
// and environment variables to pick everything it needs by convention.
// Companion `@subsquid/typeorm-migration` tool works in the same way.
//
// For full configuration details please consult
// https://github.com/subsquid/squid-sdk/blob/278195bd5a5ed0a9e24bfb99ee7bbb86ff94ccb3/typeorm/typeorm-config/src/config.ts#L21
const database = new TypeormDatabase();

interface Trade {
    type: string;
    signature: string;
    timestamp: Date;
    trader: string;
    mint_spent: string;
    amount_spent: number;
    mint_got: string;
    amount_got: number;
    fee: number;
}

// Now we are ready to start data processing
run(dataSource, database, async ctx => {
    // Block items that we get from `ctx.blocks` are flat JS objects.
    //
    // We can use `augmentBlock()` function from `@subsquid/solana-objects`
    // to enrich block items with references to related objects and
    // with convenient getters for derived data (e.g. `Instruction.d8`).
    let blocks = ctx.blocks.map(augmentBlock)

    let exchanges: Exchange[] = []
    let solTrades: SolTrade[] = []
    let tokenTrades: TokenTrade[] = []
    let jupSignatures: JupSignature[] = []

    for (let block of blocks) {
        for (let ins of block.instructions) {
            // https://read.cryptodatabytes.com/p/starter-guide-to-solana-data-analysis
            if (ins.programId === jupiter.programId && ins.inner.length > 1) {

                //console.log("PROCESSING NEW TRADE#  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

                let trade: Trade = {
                    type: '',
                    signature: ins.getTransaction().signatures[0],
                    timestamp: new Date(block.header.timestamp * 1000),
                    trader: '',
                    mint_spent: '',
                    amount_spent: 0,
                    mint_got: '',
                    amount_got: 0,
                    fee: 0
                };

                if(ins.d8 === jupiter.instructions.sharedAccountsRoute.d8) {

                    //console.log("sharedAccountsRoute------------------------------------------------------------------------");

                    let route = jupiter.instructions.sharedAccountsRoute.decode({accounts: ins.accounts, data: ins.data});
                    let signature = ins.transaction?.signatures[0] || '';
                    let trader = route.accounts.userTransferAuthority;
                    let timestamp = new Date(block.header.timestamp * 1000);
                    let mint_spent = route.accounts.sourceMint;
                    let mint_got = route.accounts.destinationMint;
                    let amount_spent = parseInt(route.data.inAmount.toString());
                    let quotedOutAmount = route.data.quotedOutAmount.toString();
                    let fee = parseInt(ins.getTransaction().fee.toString());

                    let tokendelta: bigint = 0n;
                    
                    ins.getTransaction().instructions.forEach((inst) => {
                        if(inst.programId === tokenProgram.programId && inst.d1 === tokenProgram.instructions.transferChecked.d1){
                            let transfer = tokenProgram.instructions.transferChecked.decode({accounts: inst.accounts, data: inst.data});
                            tokendelta = transfer.data.amount;
                        }
                    });

                    let amount_got = tokendelta;

                    // ------------------------------------------------------------------------
                    
                    
                    // console.log("signature: ", signature);
                    // console.log("timestamp: ", timestamp);
                    // console.log("trader:", trader);
                    // console.log("mint_spent: ", mint_spent);
                    // console.log("amount_spent: ", amount_spent);
                    // console.log("mint_got: ", mint_got);
                    // console.log("amount_got: ", amount_got);
                    // console.log("quotedOutAmount: ", quotedOutAmount);
                    // console.log("fee:", fee);

                    trade = {
                        type: 'sharedAccountsRoute',
                        signature: signature,
                        timestamp: timestamp,
                        trader: trader,
                        mint_spent: mint_spent,
                        amount_spent: amount_spent,
                        mint_got: mint_got,
                        amount_got: parseInt(amount_got.toString()),
                        fee: fee    
                    };

                    // console.log(route);
                    // console.log(route.data.routePlan);
                }

                if (ins.d8 === jupiter.instructions.route.d8) {

                    //console.log("ROUTE ========================================================================");

                    let route = jupiter.instructions.route.decode({accounts: ins.accounts, data: ins.data});
                    //console.log(ins.getTransaction().signatures[0]);
                    let signature = ins.transaction?.signatures[0] || '';
                    let trader = route.accounts.userTransferAuthority;
                    let timestamp = new Date(block.header.timestamp * 1000);
                    let mint_spent = '';
                    let mint_got = route.accounts.destinationMint;
                    let amount_spent = parseInt(route.data.inAmount.toString());
                    let amount_got: number = 0;
                    let quotedOutAmount = route.data.quotedOutAmount.toString();
                    let fee = parseInt(ins.getTransaction().fee.toString());
                    ins.getTransaction().instructions.forEach((inst) => {

                        if(inst.programId === tokenProgram.programId && inst.d1 === tokenProgram.instructions.transferChecked.d1){
                            let transfer = tokenProgram.instructions.transferChecked.decode({accounts: inst.accounts, data: inst.data});
                            if(transfer.accounts.source === route.accounts.userSourceTokenAccount) {
                                mint_spent = transfer.accounts.tokenMint;
                                amount_spent = parseInt(transfer.data.amount.toString());
                            }
                            if(transfer.accounts.destination === route.accounts.userDestinationTokenAccount) {
                                mint_got = transfer.accounts.tokenMint;
                                amount_got = parseInt(transfer.data.amount.toString());
                            }

                        }

                        if(inst.programId === tokenProgram.programId && inst.d1 === tokenProgram.instructions.transfer.d1) {
                            let transfer = tokenProgram.instructions.transfer.decode({accounts: inst.accounts, data: inst.data});
                            if(transfer.accounts.source === route.accounts.userSourceTokenAccount) {
                                amount_spent = parseInt(transfer.data.amount.toString());
                                mint_spent = ins.getTransaction().tokenBalances.find(tb => tb.account === transfer.accounts.destination)?.preMint ?? '';
                            }
                            if(transfer.accounts.destination === route.accounts.userDestinationTokenAccount) {
                                amount_got = parseInt(transfer.data.amount.toString());
                            }
                            //console.log("Transfer: ", transfer);
                        }

                    });                    

                    // ------------------------------------------------------------------------
                    
                    
                    // console.log("signature: ", signature);
                    // console.log("timestamp: ", timestamp);
                    // console.log("trader:", trader);
                    // console.log("mint_spent: ", mint_spent);
                    // console.log("amount_spent: ", amount_spent);
                    // console.log("mint_got: ", mint_got);
                    // console.log("amount_got: ", amount_got);
                    // console.log("fee:", fee);

                    trade = {
                        type: 'route',
                        signature: signature,
                        timestamp: timestamp,
                        trader: trader,
                        mint_spent: mint_spent,
                        amount_spent: amount_spent,
                        mint_got: mint_got,
                        amount_got: amount_got,
                        fee: fee
                    }

                    // console.log(route);
                    // console.log(route.data.routePlan);
                }

                if (trade.mint_got === trade.mint_spent) break;

                let solIn = trade.mint_spent === SOL_MINT;
                let solOut = trade.mint_got === SOL_MINT;

                if(solIn || solOut) {
                    let solTrade = new SolTrade({
                        id: trade.signature,
                        bucket: 1,
                        trader: trade.trader,
                        mint: solIn ? trade.mint_got : trade.mint_spent,
                        timestamp: trade.timestamp,
                        token_delta: solIn ? trade.amount_got : -trade.amount_spent,
                        sol_delta: solIn ? -trade.amount_spent : trade.amount_got,
                        fee: trade.fee
                    });

                    solTrades.push(solTrade);

                    //console.log(solTrade);

                } else {
                    let tokenTrade = new TokenTrade({
                        id: trade.signature,
                        bucket: 1,
                        trader: trade.trader,
                        timestamp: trade.timestamp,
                        mint_spent: trade.mint_spent,
                        amount_spent: trade.amount_spent,
                        mint_got: trade.mint_got,
                        amount_got: trade.amount_got,
                        fee: trade.fee
                    });

                    tokenTrades.push(tokenTrade);
                    //console.log(tokenTrade);
                }

                let jup_signature = new JupSignature({
                    id: trade.signature,
                    timestamp: trade.timestamp,
                    bucket: 1,
                    processed: true,
                    is_trade_extracted: true
                });

                jupSignatures.push(jup_signature);


                //console.log(trade);
                
                
                // exchange.fromToken = srcMint
                // exchange.fromOwner = srcBalance?.preOwner || srcTransfer.accounts.source
                // exchange.fromAmount = srcTransfer.data.amount

                // exchange.toToken = destMint
                // exchange.toOwner = destBalance?.postOwner || destBalance?.preOwner || destTransfer.accounts.destination
                // exchange.toAmount = destTransfer.data.amount

                // exchanges.push(exchange)
            }
        }
    }

    //console.log(solTrades);

    const idMap: { [key: string]: number } = {};
    const duplicates: string[] = [];

    solTrades.forEach(trade => {
        if (idMap[trade.id]) {
            idMap[trade.id]++;
        } else {
            idMap[trade.id] = 1;
        }
    });

    for (const id in idMap) {
        if (idMap[id] > 1) {
            duplicates.push(id);
        }
    }

    //console.log(duplicates);

    console.log("Duplicates:", duplicates.length, "of", solTrades.length);

    duplicates.forEach(id => {
        console.log("Duplicate ID: ", id);
        let count = 0;
        let firstTrade: SolTrade = {
            id: '',
            bucket: 0,
            trader: '',
            mint: '',
            timestamp: new Date(),
            token_delta: 0,
            sol_delta: 0,
            fee: 0
        };
        let secordTrade: SolTrade = firstTrade;

        solTrades.forEach(trade => {
            if (trade.id === id) {
                count += 1;
                // console.log(count, "-----------------------------------------------------------------------------------------------------------------");
                // console.log(trade);
                if (count === 1) {
                    firstTrade = trade;
                } else {
                    secordTrade = trade;
                }
            }
        });

        let trade = firstTrade;

        trade.sol_delta = firstTrade.sol_delta;
        trade.token_delta = -secordTrade.token_delta;

        solTrades = solTrades.filter(trd => trade.id !== trd.id);

        solTrades.push(trade);

        // console.log("FinalTrade: ",trade);

    });



    await ctx.store.insert(solTrades);
    //await ctx.store.insert(tokenTrades);
    //await ctx.store.insert(jupSignatures);

    //await ctx.store.insert(exchanges)
})
