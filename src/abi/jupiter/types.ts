import {Codec, struct, u64, u16, ref, u8, unit, sum, bool, u32, option, array, address} from '@subsquid/borsh'

export interface AmountWithSlippage {
    amount: bigint
    slippageBps: number
}

export const AmountWithSlippage: Codec<AmountWithSlippage> = struct({
    amount: u64,
    slippageBps: u16,
})

export interface RoutePlanStep {
    swap: Swap
    percent: number
    inputIndex: number
    outputIndex: number
}

export const RoutePlanStep: Codec<RoutePlanStep> = struct({
    swap: ref(() => Swap),
    percent: u8,
    inputIndex: u8,
    outputIndex: u8,
})

export type Side_Bid = undefined

export const Side_Bid = unit

export type Side_Ask = undefined

export const Side_Ask = unit

export type Side = 
    | {
        kind: 'Bid'
        value?: Side_Bid
      }
    | {
        kind: 'Ask'
        value?: Side_Ask
      }

export const Side: Codec<Side> = sum(1, {
    Bid: {
        discriminator: 0,
        value: Side_Bid,
    },
    Ask: {
        discriminator: 1,
        value: Side_Ask,
    },
})

export type Swap_Saber = undefined

export const Swap_Saber = unit

export type Swap_SaberAddDecimalsDeposit = undefined

export const Swap_SaberAddDecimalsDeposit = unit

export type Swap_SaberAddDecimalsWithdraw = undefined

export const Swap_SaberAddDecimalsWithdraw = unit

export type Swap_TokenSwap = undefined

export const Swap_TokenSwap = unit

export type Swap_Sencha = undefined

export const Swap_Sencha = unit

export type Swap_Step = undefined

export const Swap_Step = unit

export type Swap_Cropper = undefined

export const Swap_Cropper = unit

export type Swap_Raydium = undefined

export const Swap_Raydium = unit

export type Swap_Crema = {
    aToB: boolean
}

export const Swap_Crema = struct({
    aToB: bool,
})

export type Swap_Lifinity = undefined

export const Swap_Lifinity = unit

export type Swap_Mercurial = undefined

export const Swap_Mercurial = unit

export type Swap_Cykura = undefined

export const Swap_Cykura = unit

export type Swap_Serum = {
    side: Side
}

export const Swap_Serum = struct({
    side: ref(() => Side),
})

export type Swap_MarinadeDeposit = undefined

export const Swap_MarinadeDeposit = unit

export type Swap_MarinadeUnstake = undefined

export const Swap_MarinadeUnstake = unit

export type Swap_Aldrin = {
    side: Side
}

export const Swap_Aldrin = struct({
    side: ref(() => Side),
})

export type Swap_AldrinV2 = {
    side: Side
}

export const Swap_AldrinV2 = struct({
    side: ref(() => Side),
})

export type Swap_Whirlpool = {
    aToB: boolean
}

export const Swap_Whirlpool = struct({
    aToB: bool,
})

export type Swap_Invariant = {
    xToY: boolean
}

export const Swap_Invariant = struct({
    xToY: bool,
})

export type Swap_Meteora = undefined

export const Swap_Meteora = unit

export type Swap_GooseFX = undefined

export const Swap_GooseFX = unit

export type Swap_DeltaFi = {
    stable: boolean
}

export const Swap_DeltaFi = struct({
    stable: bool,
})

export type Swap_Balansol = undefined

export const Swap_Balansol = unit

export type Swap_MarcoPolo = {
    xToY: boolean
}

export const Swap_MarcoPolo = struct({
    xToY: bool,
})

export type Swap_Dradex = {
    side: Side
}

export const Swap_Dradex = struct({
    side: ref(() => Side),
})

export type Swap_LifinityV2 = undefined

export const Swap_LifinityV2 = unit

export type Swap_RaydiumClmm = undefined

export const Swap_RaydiumClmm = unit

export type Swap_Openbook = {
    side: Side
}

export const Swap_Openbook = struct({
    side: ref(() => Side),
})

export type Swap_Phoenix = {
    side: Side
}

export const Swap_Phoenix = struct({
    side: ref(() => Side),
})

export type Swap_Symmetry = {
    fromTokenId: bigint
    toTokenId: bigint
}

export const Swap_Symmetry = struct({
    fromTokenId: u64,
    toTokenId: u64,
})

export type Swap_TokenSwapV2 = undefined

export const Swap_TokenSwapV2 = unit

export type Swap_HeliumTreasuryManagementRedeemV0 = undefined

export const Swap_HeliumTreasuryManagementRedeemV0 = unit

export type Swap_StakeDexStakeWrappedSol = undefined

export const Swap_StakeDexStakeWrappedSol = unit

export type Swap_StakeDexSwapViaStake = {
    bridgeStakeSeed: number
}

export const Swap_StakeDexSwapViaStake = struct({
    bridgeStakeSeed: u32,
})

export type Swap_GooseFXV2 = undefined

export const Swap_GooseFXV2 = unit

export type Swap_Perps = undefined

export const Swap_Perps = unit

export type Swap_PerpsAddLiquidity = undefined

export const Swap_PerpsAddLiquidity = unit

export type Swap_PerpsRemoveLiquidity = undefined

export const Swap_PerpsRemoveLiquidity = unit

export type Swap_MeteoraDlmm = undefined

export const Swap_MeteoraDlmm = unit

export type Swap_OpenBookV2 = {
    side: Side
}

export const Swap_OpenBookV2 = struct({
    side: ref(() => Side),
})

export type Swap_RaydiumClmmV2 = undefined

export const Swap_RaydiumClmmV2 = unit

export type Swap_StakeDexPrefundWithdrawStakeAndDepositStake = {
    bridgeStakeSeed: number
}

export const Swap_StakeDexPrefundWithdrawStakeAndDepositStake = struct({
    bridgeStakeSeed: u32,
})

export type Swap_Clone = {
    poolIndex: number
    quantityIsInput: boolean
    quantityIsCollateral: boolean
}

export const Swap_Clone = struct({
    poolIndex: u8,
    quantityIsInput: bool,
    quantityIsCollateral: bool,
})

export type Swap_SanctumS = {
    srcLstValueCalcAccs: number
    dstLstValueCalcAccs: number
    srcLstIndex: number
    dstLstIndex: number
}

export const Swap_SanctumS = struct({
    srcLstValueCalcAccs: u8,
    dstLstValueCalcAccs: u8,
    srcLstIndex: u32,
    dstLstIndex: u32,
})

export type Swap_SanctumSAddLiquidity = {
    lstValueCalcAccs: number
    lstIndex: number
}

export const Swap_SanctumSAddLiquidity = struct({
    lstValueCalcAccs: u8,
    lstIndex: u32,
})

export type Swap_SanctumSRemoveLiquidity = {
    lstValueCalcAccs: number
    lstIndex: number
}

export const Swap_SanctumSRemoveLiquidity = struct({
    lstValueCalcAccs: u8,
    lstIndex: u32,
})

export type Swap_RaydiumCP = undefined

export const Swap_RaydiumCP = unit

export type Swap_WhirlpoolSwapV2 = {
    aToB: boolean
    remainingAccountsInfo?: RemainingAccountsInfo | undefined
}

export const Swap_WhirlpoolSwapV2 = struct({
    aToB: bool,
    remainingAccountsInfo: option(ref(() => RemainingAccountsInfo)),
})

export type Swap = 
    | {
        kind: 'Saber'
        value?: Swap_Saber
      }
    | {
        kind: 'SaberAddDecimalsDeposit'
        value?: Swap_SaberAddDecimalsDeposit
      }
    | {
        kind: 'SaberAddDecimalsWithdraw'
        value?: Swap_SaberAddDecimalsWithdraw
      }
    | {
        kind: 'TokenSwap'
        value?: Swap_TokenSwap
      }
    | {
        kind: 'Sencha'
        value?: Swap_Sencha
      }
    | {
        kind: 'Step'
        value?: Swap_Step
      }
    | {
        kind: 'Cropper'
        value?: Swap_Cropper
      }
    | {
        kind: 'Raydium'
        value?: Swap_Raydium
      }
    | {
        kind: 'Crema'
        value: Swap_Crema
      }
    | {
        kind: 'Lifinity'
        value?: Swap_Lifinity
      }
    | {
        kind: 'Mercurial'
        value?: Swap_Mercurial
      }
    | {
        kind: 'Cykura'
        value?: Swap_Cykura
      }
    | {
        kind: 'Serum'
        value: Swap_Serum
      }
    | {
        kind: 'MarinadeDeposit'
        value?: Swap_MarinadeDeposit
      }
    | {
        kind: 'MarinadeUnstake'
        value?: Swap_MarinadeUnstake
      }
    | {
        kind: 'Aldrin'
        value: Swap_Aldrin
      }
    | {
        kind: 'AldrinV2'
        value: Swap_AldrinV2
      }
    | {
        kind: 'Whirlpool'
        value: Swap_Whirlpool
      }
    | {
        kind: 'Invariant'
        value: Swap_Invariant
      }
    | {
        kind: 'Meteora'
        value?: Swap_Meteora
      }
    | {
        kind: 'GooseFX'
        value?: Swap_GooseFX
      }
    | {
        kind: 'DeltaFi'
        value: Swap_DeltaFi
      }
    | {
        kind: 'Balansol'
        value?: Swap_Balansol
      }
    | {
        kind: 'MarcoPolo'
        value: Swap_MarcoPolo
      }
    | {
        kind: 'Dradex'
        value: Swap_Dradex
      }
    | {
        kind: 'LifinityV2'
        value?: Swap_LifinityV2
      }
    | {
        kind: 'RaydiumClmm'
        value?: Swap_RaydiumClmm
      }
    | {
        kind: 'Openbook'
        value: Swap_Openbook
      }
    | {
        kind: 'Phoenix'
        value: Swap_Phoenix
      }
    | {
        kind: 'Symmetry'
        value: Swap_Symmetry
      }
    | {
        kind: 'TokenSwapV2'
        value?: Swap_TokenSwapV2
      }
    | {
        kind: 'HeliumTreasuryManagementRedeemV0'
        value?: Swap_HeliumTreasuryManagementRedeemV0
      }
    | {
        kind: 'StakeDexStakeWrappedSol'
        value?: Swap_StakeDexStakeWrappedSol
      }
    | {
        kind: 'StakeDexSwapViaStake'
        value: Swap_StakeDexSwapViaStake
      }
    | {
        kind: 'GooseFXV2'
        value?: Swap_GooseFXV2
      }
    | {
        kind: 'Perps'
        value?: Swap_Perps
      }
    | {
        kind: 'PerpsAddLiquidity'
        value?: Swap_PerpsAddLiquidity
      }
    | {
        kind: 'PerpsRemoveLiquidity'
        value?: Swap_PerpsRemoveLiquidity
      }
    | {
        kind: 'MeteoraDlmm'
        value?: Swap_MeteoraDlmm
      }
    | {
        kind: 'OpenBookV2'
        value: Swap_OpenBookV2
      }
    | {
        kind: 'RaydiumClmmV2'
        value?: Swap_RaydiumClmmV2
      }
    | {
        kind: 'StakeDexPrefundWithdrawStakeAndDepositStake'
        value: Swap_StakeDexPrefundWithdrawStakeAndDepositStake
      }
    | {
        kind: 'Clone'
        value: Swap_Clone
      }
    | {
        kind: 'SanctumS'
        value: Swap_SanctumS
      }
    | {
        kind: 'SanctumSAddLiquidity'
        value: Swap_SanctumSAddLiquidity
      }
    | {
        kind: 'SanctumSRemoveLiquidity'
        value: Swap_SanctumSRemoveLiquidity
      }
    | {
        kind: 'RaydiumCP'
        value?: Swap_RaydiumCP
      }
    | {
        kind: 'WhirlpoolSwapV2'
        value: Swap_WhirlpoolSwapV2
      }

export const Swap: Codec<Swap> = sum(1, {
    Saber: {
        discriminator: 0,
        value: Swap_Saber,
    },
    SaberAddDecimalsDeposit: {
        discriminator: 1,
        value: Swap_SaberAddDecimalsDeposit,
    },
    SaberAddDecimalsWithdraw: {
        discriminator: 2,
        value: Swap_SaberAddDecimalsWithdraw,
    },
    TokenSwap: {
        discriminator: 3,
        value: Swap_TokenSwap,
    },
    Sencha: {
        discriminator: 4,
        value: Swap_Sencha,
    },
    Step: {
        discriminator: 5,
        value: Swap_Step,
    },
    Cropper: {
        discriminator: 6,
        value: Swap_Cropper,
    },
    Raydium: {
        discriminator: 7,
        value: Swap_Raydium,
    },
    Crema: {
        discriminator: 8,
        value: Swap_Crema,
    },
    Lifinity: {
        discriminator: 9,
        value: Swap_Lifinity,
    },
    Mercurial: {
        discriminator: 10,
        value: Swap_Mercurial,
    },
    Cykura: {
        discriminator: 11,
        value: Swap_Cykura,
    },
    Serum: {
        discriminator: 12,
        value: Swap_Serum,
    },
    MarinadeDeposit: {
        discriminator: 13,
        value: Swap_MarinadeDeposit,
    },
    MarinadeUnstake: {
        discriminator: 14,
        value: Swap_MarinadeUnstake,
    },
    Aldrin: {
        discriminator: 15,
        value: Swap_Aldrin,
    },
    AldrinV2: {
        discriminator: 16,
        value: Swap_AldrinV2,
    },
    Whirlpool: {
        discriminator: 17,
        value: Swap_Whirlpool,
    },
    Invariant: {
        discriminator: 18,
        value: Swap_Invariant,
    },
    Meteora: {
        discriminator: 19,
        value: Swap_Meteora,
    },
    GooseFX: {
        discriminator: 20,
        value: Swap_GooseFX,
    },
    DeltaFi: {
        discriminator: 21,
        value: Swap_DeltaFi,
    },
    Balansol: {
        discriminator: 22,
        value: Swap_Balansol,
    },
    MarcoPolo: {
        discriminator: 23,
        value: Swap_MarcoPolo,
    },
    Dradex: {
        discriminator: 24,
        value: Swap_Dradex,
    },
    LifinityV2: {
        discriminator: 25,
        value: Swap_LifinityV2,
    },
    RaydiumClmm: {
        discriminator: 26,
        value: Swap_RaydiumClmm,
    },
    Openbook: {
        discriminator: 27,
        value: Swap_Openbook,
    },
    Phoenix: {
        discriminator: 28,
        value: Swap_Phoenix,
    },
    Symmetry: {
        discriminator: 29,
        value: Swap_Symmetry,
    },
    TokenSwapV2: {
        discriminator: 30,
        value: Swap_TokenSwapV2,
    },
    HeliumTreasuryManagementRedeemV0: {
        discriminator: 31,
        value: Swap_HeliumTreasuryManagementRedeemV0,
    },
    StakeDexStakeWrappedSol: {
        discriminator: 32,
        value: Swap_StakeDexStakeWrappedSol,
    },
    StakeDexSwapViaStake: {
        discriminator: 33,
        value: Swap_StakeDexSwapViaStake,
    },
    GooseFXV2: {
        discriminator: 34,
        value: Swap_GooseFXV2,
    },
    Perps: {
        discriminator: 35,
        value: Swap_Perps,
    },
    PerpsAddLiquidity: {
        discriminator: 36,
        value: Swap_PerpsAddLiquidity,
    },
    PerpsRemoveLiquidity: {
        discriminator: 37,
        value: Swap_PerpsRemoveLiquidity,
    },
    MeteoraDlmm: {
        discriminator: 38,
        value: Swap_MeteoraDlmm,
    },
    OpenBookV2: {
        discriminator: 39,
        value: Swap_OpenBookV2,
    },
    RaydiumClmmV2: {
        discriminator: 40,
        value: Swap_RaydiumClmmV2,
    },
    StakeDexPrefundWithdrawStakeAndDepositStake: {
        discriminator: 41,
        value: Swap_StakeDexPrefundWithdrawStakeAndDepositStake,
    },
    Clone: {
        discriminator: 42,
        value: Swap_Clone,
    },
    SanctumS: {
        discriminator: 43,
        value: Swap_SanctumS,
    },
    SanctumSAddLiquidity: {
        discriminator: 44,
        value: Swap_SanctumSAddLiquidity,
    },
    SanctumSRemoveLiquidity: {
        discriminator: 45,
        value: Swap_SanctumSRemoveLiquidity,
    },
    RaydiumCP: {
        discriminator: 46,
        value: Swap_RaydiumCP,
    },
    WhirlpoolSwapV2: {
        discriminator: 47,
        value: Swap_WhirlpoolSwapV2,
    },
})

export interface RemainingAccountsSlice {
    accountsType: AccountsType
    length: number
}

export const RemainingAccountsSlice: Codec<RemainingAccountsSlice> = struct({
    accountsType: ref(() => AccountsType),
    length: u8,
})

export interface RemainingAccountsInfo {
    slices: Array<RemainingAccountsSlice>
}

export const RemainingAccountsInfo: Codec<RemainingAccountsInfo> = struct({
    slices: array(ref(() => RemainingAccountsSlice)),
})

export type AccountsType_TransferHookA = undefined

export const AccountsType_TransferHookA = unit

export type AccountsType_TransferHookB = undefined

export const AccountsType_TransferHookB = unit

export type AccountsType = 
    | {
        kind: 'TransferHookA'
        value?: AccountsType_TransferHookA
      }
    | {
        kind: 'TransferHookB'
        value?: AccountsType_TransferHookB
      }

export const AccountsType: Codec<AccountsType> = sum(1, {
    TransferHookA: {
        discriminator: 0,
        value: AccountsType_TransferHookA,
    },
    TransferHookB: {
        discriminator: 1,
        value: AccountsType_TransferHookB,
    },
})

export interface TokenLedger {
    tokenAccount: string
    amount: bigint
}

export const TokenLedger: Codec<TokenLedger> = struct({
    tokenAccount: address,
    amount: u64,
})

export interface SwapEvent {
    amm: string
    inputMint: string
    inputAmount: bigint
    outputMint: string
    outputAmount: bigint
}

export const SwapEvent: Codec<SwapEvent> = struct({
    amm: address,
    inputMint: address,
    inputAmount: u64,
    outputMint: address,
    outputAmount: u64,
})

export interface FeeEvent {
    account: string
    mint: string
    amount: bigint
}

export const FeeEvent: Codec<FeeEvent> = struct({
    account: address,
    mint: address,
    amount: u64,
})
