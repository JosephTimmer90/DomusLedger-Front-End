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
    propertiesArray: [{ id: 'test-prop-1', address: '245 Western Ave',   city: 'Albany',  state: 'NY', zip: '12203', type: 'MULTI_FAMILY'},
     { id: 'test-prop-2', address: '18 Elm Street',     city: 'Albany',  state: 'NY', zip: '12207', type: 'SINGLE_FAMILY'},
      { id: 'test-prop-3', address: '77 Congress Street',city: 'Troy',   state: 'NY', zip: '12180', type: 'MULTI_FAMILY'},
     { id: 'test-prop-4', address: '112 River Road',    city: 'Troy',   state: 'NY', zip: '12182', type: 'CONDO'}
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