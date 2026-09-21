import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { FormFields } from './pages/AddTenantForm';

export interface tenantsSlice {
    addTenantButtonClicked: boolean,
    tenantsArray: FormFields[],
    toggleTenantButtonClicked: () => void,
    appendTenantsArray: (newTenant: FormFields) => void
}

//   // ── Tenants ────────────────────────────────────────────────────────────────
//   const tenants = [
//     { id: 'test-tenant-1', firstName: 'Maria',   lastName: 'Chen',     email: 'maria.chen@email.test',    phone: '518-555-0101' },
//     { id: 'test-tenant-2', firstName: 'David',   lastName: 'Okafor',   email: 'd.okafor@email.test',     phone: '518-555-0102' },
//     { id: 'test-tenant-3', firstName: 'Sarah',   lastName: 'Nguyen',   email: 'sarah.nguyen@email.test',  phone: '518-555-0103' },
//     { id: 'test-tenant-4', firstName: 'James',   lastName: 'Patel',    email: 'j.patel@email.test',      phone: '518-555-0104' },
//     { id: 'test-tenant-5', firstName: 'Elena',   lastName: 'Rivera',   email: 'e.rivera@email.test',     phone: '518-555-0105' },
//     { id: 'test-tenant-6', firstName: 'Michael', lastName: 'Thompson', email: 'm.thompson@email.test',   phone: '518-555-0106' },
//   ];

export const createTenantsSlice: StateCreator<
    BoundStore,
    [],
    [],
    tenantsSlice
> = (set) => ({
    addTenantButtonClicked: false,
    tenantsArray: [{ id: 'test-tenant-1', firstName: 'Maria',   lastName: 'Chen',     email: 'maria.chen@email.test',    phone: '518-555-0101' },
                { id: 'test-tenant-2', firstName: 'David',   lastName: 'Okafor',   email: 'd.okafor@email.test',     phone: '518-555-0102' },
                { id: 'test-tenant-3', firstName: 'Sarah',   lastName: 'Nguyen',   email: 'sarah.nguyen@email.test',  phone: '518-555-0103' },
                { id: 'test-tenant-4', firstName: 'James',   lastName: 'Patel',    email: 'j.patel@email.test',      phone: '518-555-0104' },
                { id: 'test-tenant-5', firstName: 'Elena',   lastName: 'Rivera',   email: 'e.rivera@email.test',     phone: '518-555-0105' },
                { id: 'test-tenant-6', firstName: 'Michael', lastName: 'Thompson', email: 'm.thompson@email.test',   phone: '518-555-0106' } 
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