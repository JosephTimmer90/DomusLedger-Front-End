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
    tenantsArray: [{id: 1, firstName: 'John', lastName: 'Alex', email: 'John@goog.com', Phone: '(815) 123-456'}, 
                    {id: 2, address: 'b', city: 'cb', state: 'sb', zip: 2},
                    {id: 3, address: 'c', city: 'cc', state: 'sc', zip: 3}
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