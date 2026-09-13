import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { FormFields } from './pages/AddTenantForm';

export interface tenantsSlice {
    addTenantButtonClicked: boolean,
    tenantsArray: FormFields[],
    toggleTenantButtonClicked: () => void,
    appendTenantsArray: (newTenant: FormFields) => void
}

export const createTenantsSlice: StateCreator<
    BoundStore,
    [],
    [],
    tenantsSlice
> = (set) => ({
    addTenantButtonClicked: false,
    tenantsArray: [{id: 1, firstName: 'John', lastName: 'Alex', email: 'John@goog.com', phone: '(815) 123-456'}, 
                    {id: 2, firstName: 'Joe', lastName: 'Tim', email: 'JoeT@goog.com', phone: '(815) 123-457'}, 
                    {id: 3, firstName: 'Linda', lastName: 'Tim', email: 'Lin@goog.com', phone: '(815) 123-458'} 
],
    toggleTenantButtonClicked: () =>
    set((state) => ({
        addTenantButtonClicked: !state.addTenantButtonClicked,
    })),
    appendTenantsArray: (newTenant: FormFields) => 
    set((state) => ({
        ...state,
        tenantsArray: [...state.tenantsArray, newTenant],
    })),
});