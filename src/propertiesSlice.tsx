import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { FormFields } from './pages/AddPropertyForm';

export interface propertiesSlice {
    addPropertyButtonClicked: boolean,
    propertiesArray: FormFields[],
    togglePropertyButtonClicked: () => void,
    appendPropertiesArray: (newProperty: FormFields) => void
}

export const createPropertiesSlice: StateCreator<
    BoundStore,
    [],
    [],
    propertiesSlice
> = (set) => ({
    addPropertyButtonClicked: false,
    propertiesArray: [{id: 1, address: 'a', city: 'ca', state: 'sa', zip: 1}, 
                    {id: 2, address: 'b', city: 'cb', state: 'sb', zip: 2},
                    {id: 3, address: 'c', city: 'cc', state: 'sc', zip: 3}
],
    togglePropertyButtonClicked: () =>
    set((state) => ({
        addPropertyButtonClicked: !state.addPropertyButtonClicked,
    })),
    appendPropertiesArray: (newProperty: FormFields) => 
    set((state) => ({
        ...state,
        propertiesArray: [...state.propertiesArray, newProperty],
    })),
});