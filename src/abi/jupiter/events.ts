import {event} from '../idl.support'
import {SwapEvent as SwapEvent_, FeeEvent as FeeEvent_} from './types'

export type SwapEvent = SwapEvent_

export const SwapEvent = event(
    {
        d8: '0x40c6cde8260871e2',
    },
    SwapEvent_,
)

export type FeeEvent = FeeEvent_

export const FeeEvent = event(
    {
        d8: '0x494f4e7fb8d50ddc',
    },
    FeeEvent_,
)
