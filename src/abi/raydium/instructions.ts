import {struct, u8, u64, u16, unit, option, address} from '@subsquid/borsh'
import {instruction} from '../idl.support'
import {Fees, LastOrderDistance, NeedTake, SwapInstructionBaseIn, SwapInstructionBaseOut} from './types'

export interface Initialize {
    nonce: number
    openTime: bigint
}

export const initialize = instruction(
    {
        d8: '0xafaf6d1f0d989bed',
    },
    {
        tokenProgram: 0,
        systemProgram: 1,
        rent: 2,
        amm: 3,
        ammAuthority: 4,
        ammOpenOrders: 5,
        lpMintAddress: 6,
        coinMintAddress: 7,
        pcMintAddress: 8,
        poolCoinTokenAccount: 9,
        poolPcTokenAccount: 10,
        poolWithdrawQueue: 11,
        poolTargetOrdersAccount: 12,
        userLpTokenAccount: 13,
        poolTempLpTokenAccount: 14,
        serumProgram: 15,
        serumMarket: 16,
        userWallet: 17,
    },
    struct({
        nonce: u8,
        openTime: u64,
    }),
)

export interface Initialize2 {
    nonce: number
    openTime: bigint
    initPcAmount: bigint
    initCoinAmount: bigint
}

export const initialize2 = instruction(
    {
        d8: '0x09cbfe405920b39f',
    },
    {
        tokenProgram: 0,
        splAssociatedTokenAccount: 1,
        systemProgram: 2,
        rent: 3,
        amm: 4,
        ammAuthority: 5,
        ammOpenOrders: 6,
        lpMint: 7,
        coinMint: 8,
        pcMint: 9,
        poolCoinTokenAccount: 10,
        poolPcTokenAccount: 11,
        poolWithdrawQueue: 12,
        ammTargetOrders: 13,
        poolTempLp: 14,
        serumProgram: 15,
        serumMarket: 16,
        userWallet: 17,
        userTokenCoin: 18,
        userTokenPc: 19,
        userLpTokenAccount: 20,
    },
    struct({
        nonce: u8,
        openTime: u64,
        initPcAmount: u64,
        initCoinAmount: u64,
    }),
)

export interface MonitorStep {
    planOrderLimit: number
    placeOrderLimit: number
    cancelOrderLimit: number
}

export const monitorStep = instruction(
    {
        d8: '0xfcdb123057b71a9a',
    },
    {
        tokenProgram: 0,
        rent: 1,
        clock: 2,
        amm: 3,
        ammAuthority: 4,
        ammOpenOrders: 5,
        ammTargetOrders: 6,
        poolCoinTokenAccount: 7,
        poolPcTokenAccount: 8,
        poolWithdrawQueue: 9,
        serumProgram: 10,
        serumMarket: 11,
        serumCoinVaultAccount: 12,
        serumPcVaultAccount: 13,
        serumVaultSigner: 14,
        serumReqQ: 15,
        serumEventQ: 16,
        serumBids: 17,
        serumAsks: 18,
    },
    struct({
        planOrderLimit: u16,
        placeOrderLimit: u16,
        cancelOrderLimit: u16,
    }),
)

export interface Deposit {
    maxCoinAmount: bigint
    maxPcAmount: bigint
    baseSide: bigint
}

export const deposit = instruction(
    {
        d8: '0xf223c68952e1f2b6',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammAuthority: 2,
        ammOpenOrders: 3,
        ammTargetOrders: 4,
        lpMintAddress: 5,
        poolCoinTokenAccount: 6,
        poolPcTokenAccount: 7,
        serumMarket: 8,
        userCoinTokenAccount: 9,
        userPcTokenAccount: 10,
        userLpTokenAccount: 11,
        userOwner: 12,
        serumEventQueue: 13,
    },
    struct({
        maxCoinAmount: u64,
        maxPcAmount: u64,
        baseSide: u64,
    }),
)

export interface Withdraw {
    amount: bigint
}

export const withdraw = instruction(
    {
        d8: '0xb712469c946da122',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammAuthority: 2,
        ammOpenOrders: 3,
        ammTargetOrders: 4,
        lpMintAddress: 5,
        poolCoinTokenAccount: 6,
        poolPcTokenAccount: 7,
        poolWithdrawQueue: 8,
        poolTempLpTokenAccount: 9,
        serumProgram: 10,
        serumMarket: 11,
        serumCoinVaultAccount: 12,
        serumPcVaultAccount: 13,
        serumVaultSigner: 14,
        userLpTokenAccount: 15,
        uerCoinTokenAccount: 16,
        uerPcTokenAccount: 17,
        userOwner: 18,
        serumEventQ: 19,
        serumBids: 20,
        serumAsks: 21,
    },
    struct({
        amount: u64,
    }),
)

export type MigrateToOpenBook = undefined

export const migrateToOpenBook = instruction(
    {
        d8: '0xcf62f35972aecd14',
    },
    {
        tokenProgram: 0,
        systemProgram: 1,
        rent: 2,
        amm: 3,
        ammAuthority: 4,
        ammOpenOrders: 5,
        ammTokenCoin: 6,
        ammTokenPc: 7,
        ammTargetOrders: 8,
        serumProgram: 9,
        serumMarket: 10,
        serumBids: 11,
        serumAsks: 12,
        serumEventQueue: 13,
        serumCoinVault: 14,
        serumPcVault: 15,
        serumVaultSigner: 16,
        newAmmOpenOrders: 17,
        newSerumProgram: 18,
        newSerumMarket: 19,
        admin: 20,
    },
    unit,
)

export interface SetParams {
    param: number
    value?: bigint | undefined
    newPubkey?: string | undefined
    fees?: Fees | undefined
    lastOrderDistance?: LastOrderDistance | undefined
    needTakeAmounts?: NeedTake | undefined
}

export const setParams = instruction(
    {
        d8: '0x1beab2349302bb8d',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammAuthority: 2,
        ammOpenOrders: 3,
        ammTargetOrders: 4,
        ammCoinVault: 5,
        ammPcVault: 6,
        serumProgram: 7,
        serumMarket: 8,
        serumCoinVault: 9,
        serumPcVault: 10,
        serumVaultSigner: 11,
        serumEventQueue: 12,
        serumBids: 13,
        serumAsks: 14,
        ammAdminAccount: 15,
    },
    struct({
        param: u8,
        value: option(u64),
        newPubkey: option(address),
        fees: option(Fees),
        lastOrderDistance: option(LastOrderDistance),
        needTakeAmounts: option(NeedTake),
    }),
)

export type WithdrawPnl = undefined

export const withdrawPnl = instruction(
    {
        d8: '0x56249e9e5cf1fb5e',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammConfig: 2,
        ammAuthority: 3,
        ammOpenOrders: 4,
        poolCoinTokenAccount: 5,
        poolPcTokenAccount: 6,
        coinPnlTokenAccount: 7,
        pcPnlTokenAccount: 8,
        pnlOwnerAccount: 9,
        ammTargetOrders: 10,
        serumProgram: 11,
        serumMarket: 12,
        serumEventQueue: 13,
        serumCoinVaultAccount: 14,
        serumPcVaultAccount: 15,
        serumVaultSigner: 16,
    },
    unit,
)

export interface WithdrawSrm {
    amount: bigint
}

export const withdrawSrm = instruction(
    {
        d8: '0xc1653a41784e631f',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammOwnerAccount: 2,
        ammAuthority: 3,
        srmToken: 4,
        destSrmToken: 5,
    },
    struct({
        amount: u64,
    }),
)

export interface SwapBaseIn {
    amountIn: bigint
    minimumAmountOut: bigint
}

export const swapBaseIn = instruction(
    {
        d8: '0x2aec48a2f2182754',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammAuthority: 2,
        ammOpenOrders: 3,
        ammTargetOrders: 4,
        poolCoinTokenAccount: 5,
        poolPcTokenAccount: 6,
        serumProgram: 7,
        serumMarket: 8,
        serumBids: 9,
        serumAsks: 10,
        serumEventQueue: 11,
        serumCoinVaultAccount: 12,
        serumPcVaultAccount: 13,
        serumVaultSigner: 14,
        uerSourceTokenAccount: 15,
        uerDestinationTokenAccount: 16,
        userSourceOwner: 17,
    },
    struct({
        amountIn: u64,
        minimumAmountOut: u64,
    }),
)

export interface PreInitialize {
    nonce: number
}

export const preInitialize = instruction(
    {
        d8: '0xff5c572dc6acec02',
    },
    {
        tokenProgram: 0,
        systemProgram: 1,
        rent: 2,
        ammTargetOrders: 3,
        poolWithdrawQueue: 4,
        ammAuthority: 5,
        lpMintAddress: 6,
        coinMintAddress: 7,
        pcMintAddress: 8,
        poolCoinTokenAccount: 9,
        poolPcTokenAccount: 10,
        poolTempLpTokenAccount: 11,
        serumMarket: 12,
        userWallet: 13,
    },
    struct({
        nonce: u8,
    }),
)

export interface SwapBaseOut {
    maxAmountIn: bigint
    amountOut: bigint
}

export const swapBaseOut = instruction(
    {
        d8: '0xa3d29bd0af92d596',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammAuthority: 2,
        ammOpenOrders: 3,
        ammTargetOrders: 4,
        poolCoinTokenAccount: 5,
        poolPcTokenAccount: 6,
        serumProgram: 7,
        serumMarket: 8,
        serumBids: 9,
        serumAsks: 10,
        serumEventQueue: 11,
        serumCoinVaultAccount: 12,
        serumPcVaultAccount: 13,
        serumVaultSigner: 14,
        uerSourceTokenAccount: 15,
        uerDestinationTokenAccount: 16,
        userSourceOwner: 17,
    },
    struct({
        maxAmountIn: u64,
        amountOut: u64,
    }),
)

export interface SimulateInfo {
    param: number
    swapBaseInValue?: SwapInstructionBaseIn | undefined
    swapBaseOutValue?: SwapInstructionBaseOut | undefined
}

export const simulateInfo = instruction(
    {
        d8: '0xc34b6848fdb0b7a0',
    },
    {
        amm: 0,
        ammAuthority: 1,
        ammOpenOrders: 2,
        poolCoinTokenAccount: 3,
        poolPcTokenAccount: 4,
        lpMintAddress: 5,
        serumMarket: 6,
        serumEventQueue: 7,
    },
    struct({
        param: u8,
        swapBaseInValue: option(SwapInstructionBaseIn),
        swapBaseOutValue: option(SwapInstructionBaseOut),
    }),
)

export interface AdminCancelOrders {
    limit: number
}

export const adminCancelOrders = instruction(
    {
        d8: '0x975a6ed9c4dffb5f',
    },
    {
        tokenProgram: 0,
        amm: 1,
        ammAuthority: 2,
        ammOpenOrders: 3,
        ammTargetOrders: 4,
        poolCoinTokenAccount: 5,
        poolPcTokenAccount: 6,
        ammOwnerAccount: 7,
        ammConfig: 8,
        serumProgram: 9,
        serumMarket: 10,
        serumCoinVaultAccount: 11,
        serumPcVaultAccount: 12,
        serumVaultSigner: 13,
        serumEventQ: 14,
        serumBids: 15,
        serumAsks: 16,
    },
    struct({
        limit: u16,
    }),
)

export type CreateConfigAccount = undefined

export const createConfigAccount = instruction(
    {
        d8: '0xbee37a5449a62864',
    },
    {
        admin: 0,
        ammConfig: 1,
        owner: 2,
        systemProgram: 3,
        rent: 4,
    },
    unit,
)

export interface UpdateConfigAccount {
    param: number
    owner: string
}

export const updateConfigAccount = instruction(
    {
        d8: '0xf0200a98082d573a',
    },
    {
        admin: 0,
        ammConfig: 1,
    },
    struct({
        param: u8,
        owner: address,
    }),
)
