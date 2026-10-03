import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';

interface newSecDeposit {
  id: string;
  leaseId: string;
  secDepositCents: bigint;
  heldSince: Date;
  status: string;
}

export interface secDepositsSlice {
    addSecDepositButtonClicked: boolean,
    secDepositsArray: newSecDeposit[],
    toggleSecDepositButtonClicked: () => void,
    appendSecDepositsArray: (newsecDeposit: newSecDeposit) => void
}

export const createSecDepositsSlice: StateCreator<
    BoundStore,
    [],
    [],
    secDepositsSlice
> = (set) => ({
    addSecDepositButtonClicked: false,
    secDepositsArray: [  { id: 'sec-deposit-1', leaseId: 'test-lease-1', secDepositCents: BigInt(145000), heldSince: new Date('10/3/2026'), status: 'Held' },
                    { id: 'sec-deposit-2', leaseId: 'test-lease-2', secDepositCents: BigInt(110000), heldSince:  new Date('10/3/2026'), status: 'Held' },
                    { id: 'sec-deposit-3', leaseId: 'test-lease-3', secDepositCents: BigInt(175000), heldSince:  new Date('10/3/2026'), status: 'Held' },
                    { id: 'sec-deposit-4', leaseId: 'test-lease-4', secDepositCents: BigInt(220000), heldSince:  new Date('10/3/2026'), status: 'Held' },
                    { id: 'sec-deposit-5', leaseId: 'test-lease-5', secDepositCents: BigInt(135000), heldSince:  new Date('10/3/2026'), status: 'Held' },
                    { id: 'sec-deposit-6', leaseId: 'test-lease-6', secDepositCents: BigInt(165000), heldSince:  new Date('10/3/2026'), status: 'Held' }
],
    toggleSecDepositButtonClicked: () =>
    set((state) => ({
        addSecDepositButtonClicked: !state.addSecDepositButtonClicked,
    })),
    appendSecDepositsArray: (newSecDeposit: newSecDeposit) => 
    set((state) => ({
        ...state,
        secDepositsArray: [...state.secDepositsArray, newSecDeposit],
    })),
});