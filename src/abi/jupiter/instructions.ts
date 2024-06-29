import {struct, array, u64, u16, u8, unit} from '@subsquid/borsh'
import {instruction} from '../idl.support'
import {RoutePlanStep} from './types'

/**
 * route_plan Topologically sorted trade DAG
 */
export interface Route {
    routePlan: Array<RoutePlanStep>
    inAmount: bigint
    quotedOutAmount: bigint
    slippageBps: number
    platformFeeBps: number
}

/**
 * route_plan Topologically sorted trade DAG
 */
export const route = instruction(
    {
        d8: '0xe517cb977ae3ad2a',
    },
    {
        tokenProgram: 0,
        userTransferAuthority: 1,
        userSourceTokenAccount: 2,
        userDestinationTokenAccount: 3,
        destinationTokenAccount: 4,
        destinationMint: 5,
        platformFeeAccount: 6,
        eventAuthority: 7,
        program: 8,
    },
    struct({
        routePlan: array(RoutePlanStep),
        inAmount: u64,
        quotedOutAmount: u64,
        slippageBps: u16,
        platformFeeBps: u8,
    }),
)

export interface RouteWithTokenLedger {
    routePlan: Array<RoutePlanStep>
    quotedOutAmount: bigint
    slippageBps: number
    platformFeeBps: number
}

export const routeWithTokenLedger = instruction(
    {
        d8: '0x96564774a75d0e68',
    },
    {
        tokenProgram: 0,
        userTransferAuthority: 1,
        userSourceTokenAccount: 2,
        userDestinationTokenAccount: 3,
        destinationTokenAccount: 4,
        destinationMint: 5,
        platformFeeAccount: 6,
        tokenLedger: 7,
        eventAuthority: 8,
        program: 9,
    },
    struct({
        routePlan: array(RoutePlanStep),
        quotedOutAmount: u64,
        slippageBps: u16,
        platformFeeBps: u8,
    }),
)

/**
 * Route by using program owned token accounts and open orders accounts.
 */
export interface SharedAccountsRoute {
    id: number
    routePlan: Array<RoutePlanStep>
    inAmount: bigint
    quotedOutAmount: bigint
    slippageBps: number
    platformFeeBps: number
}

/**
 * Route by using program owned token accounts and open orders accounts.
 */
export const sharedAccountsRoute = instruction(
    {
        d8: '0xc1209b3341d69c81',
    },
    {
        tokenProgram: 0,
        programAuthority: 1,
        userTransferAuthority: 2,
        sourceTokenAccount: 3,
        programSourceTokenAccount: 4,
        programDestinationTokenAccount: 5,
        destinationTokenAccount: 6,
        sourceMint: 7,
        destinationMint: 8,
        platformFeeAccount: 9,
        token2022Program: 10,
        eventAuthority: 11,
        program: 12,
    },
    struct({
        id: u8,
        routePlan: array(RoutePlanStep),
        inAmount: u64,
        quotedOutAmount: u64,
        slippageBps: u16,
        platformFeeBps: u8,
    }),
)

export interface SharedAccountsRouteWithTokenLedger {
    id: number
    routePlan: Array<RoutePlanStep>
    quotedOutAmount: bigint
    slippageBps: number
    platformFeeBps: number
}

export const sharedAccountsRouteWithTokenLedger = instruction(
    {
        d8: '0xe6798f50779f6aaa',
    },
    {
        tokenProgram: 0,
        programAuthority: 1,
        userTransferAuthority: 2,
        sourceTokenAccount: 3,
        programSourceTokenAccount: 4,
        programDestinationTokenAccount: 5,
        destinationTokenAccount: 6,
        sourceMint: 7,
        destinationMint: 8,
        platformFeeAccount: 9,
        token2022Program: 10,
        tokenLedger: 11,
        eventAuthority: 12,
        program: 13,
    },
    struct({
        id: u8,
        routePlan: array(RoutePlanStep),
        quotedOutAmount: u64,
        slippageBps: u16,
        platformFeeBps: u8,
    }),
)

export interface ExactOutRoute {
    routePlan: Array<RoutePlanStep>
    outAmount: bigint
    quotedInAmount: bigint
    slippageBps: number
    platformFeeBps: number
}

export const exactOutRoute = instruction(
    {
        d8: '0xd033ef977b2bed5c',
    },
    {
        tokenProgram: 0,
        userTransferAuthority: 1,
        userSourceTokenAccount: 2,
        userDestinationTokenAccount: 3,
        destinationTokenAccount: 4,
        sourceMint: 5,
        destinationMint: 6,
        platformFeeAccount: 7,
        token2022Program: 8,
        eventAuthority: 9,
        program: 10,
    },
    struct({
        routePlan: array(RoutePlanStep),
        outAmount: u64,
        quotedInAmount: u64,
        slippageBps: u16,
        platformFeeBps: u8,
    }),
)

/**
 * Route by using program owned token accounts and open orders accounts.
 */
export interface SharedAccountsExactOutRoute {
    id: number
    routePlan: Array<RoutePlanStep>
    outAmount: bigint
    quotedInAmount: bigint
    slippageBps: number
    platformFeeBps: number
}

/**
 * Route by using program owned token accounts and open orders accounts.
 */
export const sharedAccountsExactOutRoute = instruction(
    {
        d8: '0xb0d169a89a7d453e',
    },
    {
        tokenProgram: 0,
        programAuthority: 1,
        userTransferAuthority: 2,
        sourceTokenAccount: 3,
        programSourceTokenAccount: 4,
        programDestinationTokenAccount: 5,
        destinationTokenAccount: 6,
        sourceMint: 7,
        destinationMint: 8,
        platformFeeAccount: 9,
        token2022Program: 10,
        eventAuthority: 11,
        program: 12,
    },
    struct({
        id: u8,
        routePlan: array(RoutePlanStep),
        outAmount: u64,
        quotedInAmount: u64,
        slippageBps: u16,
        platformFeeBps: u8,
    }),
)

export type SetTokenLedger = undefined

export const setTokenLedger = instruction(
    {
        d8: '0xe455b9704e4f4d02',
    },
    {
        tokenLedger: 0,
        tokenAccount: 1,
    },
    unit,
)

export type CreateOpenOrders = undefined

export const createOpenOrders = instruction(
    {
        d8: '0xe5c2d4ac080a8693',
    },
    {
        openOrders: 0,
        payer: 1,
        dexProgram: 2,
        systemProgram: 3,
        rent: 4,
        market: 5,
    },
    unit,
)

export interface CreateProgramOpenOrders {
    id: number
}

export const createProgramOpenOrders = instruction(
    {
        d8: '0x1ce22094bc8871ab',
    },
    {
        openOrders: 0,
        payer: 1,
        programAuthority: 2,
        dexProgram: 3,
        systemProgram: 4,
        rent: 5,
        market: 6,
    },
    struct({
        id: u8,
    }),
)

export interface Claim {
    id: number
}

export const claim = instruction(
    {
        d8: '0x3ec6d6c1d59f6cd2',
    },
    {
        wallet: 0,
        programAuthority: 1,
        systemProgram: 2,
    },
    struct({
        id: u8,
    }),
)

export interface ClaimToken {
    id: number
}

export const claimToken = instruction(
    {
        d8: '0x74ce1bbfa6130049',
    },
    {
        payer: 0,
        wallet: 1,
        programAuthority: 2,
        programTokenAccount: 3,
        destinationTokenAccount: 4,
        mint: 5,
        associatedTokenTokenProgram: 6,
        associatedTokenProgram: 7,
        systemProgram: 8,
    },
    struct({
        id: u8,
    }),
)

export type CreateTokenLedger = undefined

export const createTokenLedger = instruction(
    {
        d8: '0xe8f2c5fdf08f8134',
    },
    {
        tokenLedger: 0,
        payer: 1,
        systemProgram: 2,
    },
    unit,
)
