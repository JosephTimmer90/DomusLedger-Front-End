import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { newExpense } from './pages/AddExpenseForm';
import { formatAsBigIntCents } from './utils/format';

const monthsAgo = (n: number) => { const d = new Date(); d.setMonth(d.getMonth() - n); return d; };

export interface expensesSlice {
    addExpenseButtonClicked: boolean,
    expensesArray: newExpense[],
    filteredExpenses: newExpense[],
    showAllExpenses: boolean,
    showFilteredExpenses: boolean,
    toggleExpenseButtonClicked: () => void,
    appendExpensesArray: (newExpense: newExpense) => void,
    filterExpenses: (category: string) => void,
    setShowAllExpensesToTrue: () => void,
    setShowAllExpensesToFalse: () => void,
    setShowFilteredExpensesToTrue: () => void,
    setShowFilteredExpensesToFalse: () => void
}

export const createExpensesSlice: StateCreator<
    BoundStore,
    [],
    [],
    expensesSlice
> = (set) => ({
    addExpenseButtonClicked: false,
    expensesArray: [
    // Property 1 — Albany multi-family
    { propertyId: 'test-prop-1', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(1850), date: monthsAgo(17), description: 'Monthly mortgage payment',         vendor: 'First National Bank' },
    { propertyId: 'test-prop-1', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(1850), date: monthsAgo(16), description: 'Monthly mortgage payment',         vendor: 'First National Bank' },
    { propertyId: 'test-prop-1', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(1850), date: monthsAgo(15), description: 'Monthly mortgage payment',         vendor: 'First National Bank' },
    { propertyId: 'test-prop-1', categoryId: 'Insurance',       amountCents: formatAsBigIntCents(1200), date: monthsAgo(12), description: 'Annual landlord insurance premium', vendor: 'State Farm' },
    { propertyId: 'test-prop-1', categoryId: 'Repairs',         amountCents: formatAsBigIntCents(325),  date: monthsAgo(14), description: 'Kitchen faucet replacement unit 1A',vendor: 'Albany Plumbing Co' },
    { propertyId: 'test-prop-1', categoryId: 'Repairs',         amountCents: formatAsBigIntCents(850),  date: monthsAgo(8),  description: 'HVAC service and filter replacement',vendor: 'Cool Air Services' },
    { propertyId: 'test-prop-1', categoryId: 'Maintenance',     amountCents: formatAsBigIntCents(180),  date: monthsAgo(6),  description: 'Lawn care and snow removal Q4',    vendor: 'Green Thumb Landscaping' },
    { propertyId: 'test-prop-1', categoryId: 'Utilities',       amountCents: formatAsBigIntCents(220),  date: monthsAgo(5),  description: 'Common area electric bill',         vendor: 'National Grid' },
    // Property 2 — Albany single family
    { propertyId: 'test-prop-2', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(2100), date: monthsAgo(17), description: 'Monthly mortgage payment',         vendor: 'Capital One Home Loans' },
    { propertyId: 'test-prop-2', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(2100), date: monthsAgo(16), description: 'Monthly mortgage payment',         vendor: 'Capital One Home Loans' },
    { propertyId: 'test-prop-2', categoryId: 'Insurance',       amountCents: formatAsBigIntCents(950),  date: monthsAgo(12), description: 'Annual homeowner policy renewal',   vendor: 'Allstate' },
    { propertyId: 'test-prop-2', categoryId: 'Repairs',         amountCents: formatAsBigIntCents(1250), date: monthsAgo(10), description: 'Roof repair — storm damage',        vendor: 'Troy Roofing Inc' },
    { propertyId: 'test-prop-2', categoryId: 'Professional Fees',amountCents: formatAsBigIntCents(450), date: monthsAgo(13), description: 'Property management consultation',  vendor: 'Miller Property Advisors' },
    // Property 3 — Troy multi-family
    { propertyId: 'test-prop-3', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(1600), date: monthsAgo(17), description: 'Monthly mortgage payment',         vendor: 'Hudson Valley Credit Union' },
    { propertyId: 'test-prop-3', categoryId: 'Mortgage',        amountCents: formatAsBigIntCents(1600), date: monthsAgo(16), description: 'Monthly mortgage payment',         vendor: 'Hudson Valley Credit Union' },
    { propertyId: 'test-prop-3', categoryId: 'Maintenance',     amountCents: formatAsBigIntCents(95),   date: monthsAgo(9),  description: 'Smoke detector battery replacement',vendor: 'Home Depot' },
    { propertyId: 'test-prop-3', categoryId: 'Advertising',     amountCents: formatAsBigIntCents(150),  date: monthsAgo(4),  description: 'Zillow listing for unit 3B',        vendor: 'Zillow' },
    // Property 4 — Troy condo
    { propertyId: 'test-prop-4', categoryId: 'HOA',             amountCents: formatAsBigIntCents(425),  date: monthsAgo(17), description: 'Monthly HOA dues',                 vendor: 'River Road Condo Assoc' },
    { propertyId: 'test-prop-4', categoryId: 'HOA',             amountCents: formatAsBigIntCents(425),  date: monthsAgo(16), description: 'Monthly HOA dues',                 vendor: 'River Road Condo Assoc' },
    { propertyId: 'test-prop-4', categoryId: 'HOA',             amountCents: formatAsBigIntCents(425),  date: monthsAgo(15), description: 'Monthly HOA dues',                 vendor: 'River Road Condo Assoc' },
    { propertyId: 'test-prop-4', categoryId: 'Insurance',       amountCents: formatAsBigIntCents(650),  date: monthsAgo(11), description: 'Condo unit owner insurance policy', vendor: 'GEICO' },
    { propertyId: 'test-prop-4', categoryId: 'Professional Fees',amountCents: formatAsBigIntCents(200), date: monthsAgo(7),  description: 'Tax preparation — Schedule E',      vendor: 'H&R Block' },
  ],
    filteredExpenses: [],
    showAllExpenses: true,
    showFilteredExpenses: false,
    toggleExpenseButtonClicked: () =>
    set((state) => ({
        addExpenseButtonClicked: !state.addExpenseButtonClicked,
    })),
    appendExpensesArray: (newExpense: newExpense) => 
        set((state) => ({
            ...state,
            expensesArray: [...state.expensesArray, newExpense],
    })),
    filterExpenses: (category: string) =>
        set((state) => ({
            filteredExpenses: state.expensesArray
                .filter((expense: newExpense) => expense.categoryId.toLowerCase() === category.toLowerCase()),

    })),
    setShowAllExpensesToTrue: () =>
        set(() => ({
            showAllExpenses: true,
        })),
    setShowAllExpensesToFalse: () =>
        set(() => ({
            showAllExpenses: false,
        })),
    setShowFilteredExpensesToTrue: () =>
        set(() => ({
            showFilteredExpenses: true,
        })),
    setShowFilteredExpensesToFalse: () =>
        set(() => ({
            showFilteredExpenses: false,
        }))
    
});
