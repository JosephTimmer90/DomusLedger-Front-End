import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { newLease } from './pages/AddLeaseForm';

export interface leasesSlice {
    addLeaseButtonClicked: boolean,
    leasesArray: newLease[],
    toggleLeaseButtonClicked: () => void,
    appendLeasesArray: (newlease: newLease) => void
}

export const createLeasesSlice: StateCreator<
    BoundStore,
    [],
    [],
    leasesSlice
> = (set) => ({
    addLeaseButtonClicked: false,
    leasesArray: [{id: 1, unitId: 1, tenantId: 100, monthlyRentCents: BigInt(100000), secDepositCents: BigInt(100000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(10000)}, 
                    {id: 2, unitId: 2, tenantId: 101, monthlyRentCents: BigInt(100000), secDepositCents: BigInt(100000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(10000)},
                    {id: 3, unitId: 3, tenantId: 102, monthlyRentCents: BigInt(100000), secDepositCents: BigInt(100000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(10000)}
],
    toggleLeaseButtonClicked: () =>
    set((state) => ({
        addLeaseButtonClicked: !state.addLeaseButtonClicked,
    })),
    appendLeasesArray: (newLease: newLease) => 
    set((state) => ({
        ...state,
        leasesArray: [...state.leasesArray, newLease],
    })),
});