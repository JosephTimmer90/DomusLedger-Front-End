import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { newReport } from './pages/ReportsPage';
import type { FormFields as PropertyFormFields } from './pages/AddPropertyForm';
import type { FormFields as UnitFormFields } from './pages/AddUnitForm';
import type { newLease } from './pages/AddLeaseForm';
import type { newPayment } from './pages/AddPaymentForm';
import type { newExpense } from './pages/AddExpenseForm';

export interface PaymentSummaryRow {
    propertyId: string;
    propertyAddress: string;
    totalAmountCents: bigint;
    paymentCount: number;
}

export interface ExpenseSummaryRow {
    propertyAddress: string;
    propertyId: string;
    totalAmountCents: bigint;
}

export interface SeriesSummary {
    seriesId: string;
    totalPaymentCount: number;
    grandTotalPaymentAmountCents: bigint;
    grandTotalExpensesAmountCents: bigint;
}

export interface reportsSlice {
    currentReport: newReport;
    selectedSeriesProperties: PropertyFormFields[];
    paymentSummaryRows: PaymentSummaryRow[];
    expenseSummaryRows: ExpenseSummaryRow[];
    seriesSummary: SeriesSummary;
    updateCurrentReport: (newReportData: newReport) => void;
    summarizePaymentsByAddressAndYear: (
        propertiesArray: PropertyFormFields[],
        unitsArray: UnitFormFields[],
        leasesArray: newLease[],
        paymentsArray: newPayment[],
        seriesId: string,
        year: number,
    ) => void;
    summarizeExpensesByAddressAndYear: (
        expensesArray: newExpense[],
        year: number,
    ) => void;
    summarizePaymentsBySeries: (seriesId: string) => void;
}

export const createReportsSlice: StateCreator<
    BoundStore,
    [],
    [],
    reportsSlice
> = (set) => ({
    currentReport: { year: 0, series: '' },
    selectedSeriesProperties: [],
    paymentSummaryRows: [],
    expenseSummaryRows: [],
    seriesSummary: {
        seriesId: '',
        totalPaymentCount: 0,
        grandTotalPaymentAmountCents: BigInt(0),
        grandTotalExpensesAmountCents: BigInt(0)
    },
    updateCurrentReport: (newReportData: newReport) =>
        set((state) => ({
            ...state,
            currentReport: newReportData,
        })),
    summarizePaymentsByAddressAndYear: (
        propertiesArray: PropertyFormFields[],
        unitsArray: UnitFormFields[],
        leasesArray: newLease[],
        paymentsArray: newPayment[],
        seriesId: string,
        year: number,
    ) =>
        set((state) => {
            const selectedSeriesProperties = propertiesArray.filter(
                (property) => property.seriesId === seriesId,
            );

            const selectedPropertyIdSet = new Set(
                selectedSeriesProperties.map((property) => property.id),
            );

            const unitToProperty = new Map<string, string>();
            unitsArray.forEach((unit) => {
                if (selectedPropertyIdSet.has(unit.propertyId)) {
                    unitToProperty.set(unit.id, unit.propertyId);
                }
            });

            const leaseToProperty = new Map<string, string>();
            leasesArray.forEach((lease) => {
                const propertyId = unitToProperty.get(lease.unitId);
                if (propertyId) {
                    leaseToProperty.set(lease.id, propertyId);
                }
            });

            const propertyAddressById = new Map(
                selectedSeriesProperties.map((property) => [property.id, property.address]),
            );

            const totalsByProperty = new Map<string, PaymentSummaryRow>();
            paymentsArray.forEach((payment) => {
                if (payment.receiveDate.getFullYear() !== year) {
                    return;
                }

                const propertyId = leaseToProperty.get(payment.leaseId);
                if (!propertyId) {
                    return;
                }

                const current = totalsByProperty.get(propertyId);
                if (current) {
                    current.totalAmountCents += payment.amount;
                    current.paymentCount += 1;
                    return;
                }

                totalsByProperty.set(propertyId, {
                    propertyId,
                    propertyAddress: propertyAddressById.get(propertyId) ?? 'Unknown Address',
                    totalAmountCents: payment.amount,
                    paymentCount: 1,
                });
            });

            const paymentSummaryRows = Array.from(totalsByProperty.values()).sort((a, b) =>
                a.propertyAddress.localeCompare(b.propertyAddress),
            );

            return {
                ...state,
                selectedSeriesProperties,
                paymentSummaryRows,
            };
        }),
    summarizeExpensesByAddressAndYear: (
        expensesArray,
        year,
    ) => {
        set((state) => {
            let expenseSummaryRows: ExpenseSummaryRow[] =[]
            state.paymentSummaryRows.forEach(element => {
                expenseSummaryRows.push({
                    propertyAddress: element.propertyAddress,
                    propertyId: element.propertyId,
                    totalAmountCents: expensesArray
                    .filter((expense) => expense.propertyId === element.propertyId)
                    .filter((expense) => expense.date.getFullYear() === year)
                    .reduce((total, expense) => total + expense.amountCents, 0n)
                })     
            })
            return {
                ...state,
                expenseSummaryRows,
            };
        });
        
    },
    summarizePaymentsBySeries: (seriesId: string) => {
        set((state) => ({
            seriesSummary: {
                ...state.seriesSummary,
                seriesId: seriesId,
                totalPaymentCount: state.paymentSummaryRows.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.paymentCount
                }, 0),
                grandTotalPaymentAmountCents: state.paymentSummaryRows.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.totalAmountCents
                }, 0n),
                grandTotalExpensesAmountCents: state.expenseSummaryRows.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.totalAmountCents
                }, 0n),
            },
        }));
    },
});
