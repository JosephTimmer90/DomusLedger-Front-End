import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { newPayment } from './pages/AddPaymentForm';

const makeDate = (month: number, day: number, year: number) => new Date(year, month - 1, day);
const basePeriods = [
    { month: 1, day: 2, year: 2000 },
    { month: 2, day: 2, year: 2000 },
    { month: 3, day: 2, year: 2000 },
    { month: 4, day: 2, year: 2000 },
    { month: 5, day: 2, year: 2000 },
    { month: 6, day: 2, year: 2000 },
    { month: 7, day: 2, year: 2000 },
    { month: 8, day: 2, year: 2000 },
    { month: 9, day: 2, year: 2000 },
    { month: 10, day: 2, year: 2000 },
    { month: 11, day: 2, year: 2000 },
    { month: 12, day: 2, year: 2000 },
    { month: 1, day: 2, year: 2001 },
    { month: 2, day: 2, year: 2001 },
    { month: 3, day: 2, year: 2001 },
    { month: 4, day: 2, year: 2001 },
    { month: 5, day: 2, year: 2001 },
    { month: 6, day: 2, year: 2001 },
];

type SeedOverride = {
    amountCents?: number;
    status?: 'Received' | 'Partial' | 'Late';
    day?: number;
};

type PaymentSeed = {
    leaseId: string;
    defaultAmountCents: number;
    overrides?: Record<string, SeedOverride>;
};

const paymentSeeds: PaymentSeed[] = [
    { leaseId: 'test-lease-1', defaultAmountCents: 145000 },
    {
        leaseId: 'test-lease-2',
        defaultAmountCents: 110000,
        overrides: {
            '2000-3': { amountCents: 80000, status: 'Partial' },
        },
    },
    {
        leaseId: 'test-lease-3',
        defaultAmountCents: 175000,
        overrides: {
            '2000-11': { status: 'Late', day: 8 },
        },
    },
    { leaseId: 'test-lease-4', defaultAmountCents: 220000 },
    {
        leaseId: 'test-lease-5',
        defaultAmountCents: 135000,
        overrides: {
            '2000-7': { status: 'Late', day: 9 },
        },
    },
    { leaseId: 'test-lease-6', defaultAmountCents: 165000 },
];

const buildSeedPayments = (): newPayment[] => {
    let paymentNumber = 1;

    return paymentSeeds.flatMap((seed) =>
        basePeriods.map((period) => {
            const key = `${period.year}-${period.month}`;
            const override = seed.overrides?.[key];
            const amountCents = override?.amountCents ?? seed.defaultAmountCents;
            const status = override?.status ?? 'Received';
            const day = override?.day ?? period.day;

            const payment: newPayment = {
                id: `payment-${paymentNumber}`,
                leaseId: seed.leaseId,
                receiveDate: makeDate(period.month, day, period.year),
                amount: BigInt(amountCents),
                status,
            };

            paymentNumber += 1;
            return payment;
        }),
    );
};

export interface paymentsSlice {
    addPaymentButtonClicked: boolean,
    paymentsArray: newPayment[],
    togglePaymentButtonClicked: () => void,
    appendPaymentsArray: (newPayment: newPayment) => void
}

export const createPaymentsSlice: StateCreator<
    BoundStore,
    [],
    [],
    paymentsSlice
> = (set) => ({
    addPaymentButtonClicked: false,
    paymentsArray: buildSeedPayments(),
    togglePaymentButtonClicked: () =>
    set((state) => ({
        addPaymentButtonClicked: !state.addPaymentButtonClicked,
    })),
    appendPaymentsArray: (newPayment: newPayment) => 
    set((state) => ({
        ...state,
        paymentsArray: [...state.paymentsArray, newPayment],
    })),
});
