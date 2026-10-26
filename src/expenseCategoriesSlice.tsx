import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { FormFields } from './pages/AddExpenseCategoryForm';

export interface expenseCategoriesSlice {
    addExpenseCategoryButtonClicked: boolean,
    expenseCategoriesArray: FormFields[],
    toggleExpenseCategoryButtonClicked: () => void,
    appendExpenseCategoriesArray: (newExpenseCategory: FormFields) => void
}

export const createExpenseCategoriesSlice: StateCreator<
    BoundStore,
    [],
    [],
    expenseCategoriesSlice
> = (set) => ({
    addExpenseCategoryButtonClicked: false,
    expenseCategoriesArray: [
        {id: '0001', expenseCategoryName: 'Mortgage'},
        {id: '0002', expenseCategoryName: 'Insurance'},
        {id: '0003', expenseCategoryName: 'Repairs'},
        {id: '0004', expenseCategoryName: 'Maintenance'},
        {id: '0005', expenseCategoryName: 'Utilities'},
        {id: '0006', expenseCategoryName: 'Professional Fees'},
        {id: '0007', expenseCategoryName: 'Advertising'},
        {id: '0008', expenseCategoryName: 'HOA'}
    ],
    toggleExpenseCategoryButtonClicked: () =>
    set((state) => ({
        addExpenseCategoryButtonClicked: !state.addExpenseCategoryButtonClicked,
    })),
    appendExpenseCategoriesArray: (newExpenseCategory: FormFields) => 
    set((state) => ({
        ...state,
        expenseCategoriesArray: [...state.expenseCategoriesArray, newExpenseCategory],
    })),
});