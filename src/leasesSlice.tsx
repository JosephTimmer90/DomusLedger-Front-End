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
    leasesArray: [  { id: 'test-lease-1', unitId: 'test-unit-1a', tenantId: 'test-tenant-1', monthlyRentCents: BigInt(145000), secDepositCents: BigInt(145000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(7500) },
                    { id: 'test-lease-2', unitId: 'test-unit-1b', tenantId: 'test-tenant-2', monthlyRentCents: BigInt(110000), secDepositCents: BigInt(110000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(5000) },
                    { id: 'test-lease-3', unitId: 'test-unit-1c', tenantId: 'test-tenant-3', monthlyRentCents: BigInt(175000), secDepositCents: BigInt(175000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(10000) },
                    { id: 'test-lease-4', unitId: 'test-unit-2a', tenantId: 'test-tenant-4', monthlyRentCents: BigInt(220000), secDepositCents: BigInt(220000), lateFeeGraceDays: 7, lateFeeAmtCents: BigInt(15000) },
                    { id: 'test-lease-5', unitId: 'test-unit-3a', tenantId: 'test-tenant-5', monthlyRentCents: BigInt(135000), secDepositCents: BigInt(135000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(7500) },
                    { id: 'test-lease-6', unitId: 'test-unit-4b', tenantId: 'test-tenant-6', monthlyRentCents: BigInt(165000), secDepositCents: BigInt(165000), lateFeeGraceDays: 5, lateFeeAmtCents: BigInt(10000) }
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