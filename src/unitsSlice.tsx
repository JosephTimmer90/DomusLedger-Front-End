import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';
import type { FormFields } from './pages/AddUnitForm';

export interface unitsSlice {
    addUnitButtonClicked: boolean,
    unitsArray: FormFields[],
    toggleUnitButtonClicked: () => void,
    appendUnitsArray: (newUnit: FormFields) => void
}

//   // ── Units ──────────────────────────────────────────────────────────────────
//   const units = [
//     { id: 'test-unit-1a', unitNumber: '1A', bedrooms: 2, bathrooms: 1,   sqft: 850,  propertyId: 'test-prop-1' },
//     { id: 'test-unit-1b', unitNumber: '1B', bedrooms: 1, bathrooms: 1,   sqft: 620,  propertyId: 'test-prop-1' },
//     { id: 'test-unit-1c', unitNumber: '2A', bedrooms: 3, bathrooms: 1.5, sqft: 1100, propertyId: 'test-prop-1' },
//     { id: 'test-unit-2a', unitNumber: '1',  bedrooms: 3, bathrooms: 2,   sqft: 1400, propertyId: 'test-prop-2' },
//     { id: 'test-unit-3a', unitNumber: '1',  bedrooms: 2, bathrooms: 1,   sqft: 900,  propertyId: 'test-prop-3' },
//     { id: 'test-unit-3b', unitNumber: '2',  bedrooms: 2, bathrooms: 1,   sqft: 900,  propertyId: 'test-prop-3' },
//     { id: 'test-unit-4a', unitNumber: '101',bedrooms: 1, bathrooms: 1,   sqft: 700,  propertyId: 'test-prop-4' },
//     { id: 'test-unit-4b', unitNumber: '102',bedrooms: 2, bathrooms: 2,   sqft: 1050, propertyId: 'test-prop-4' },
//   ];

export const createUnitsSlice: StateCreator<
    BoundStore,
    [],
    [],
    unitsSlice
> = (set) => ({
    addUnitButtonClicked: false,
    unitsArray: [{ id: 'test-unit-1a', unitNumber: '1A', bedrooms: 2, bathrooms: 1,   sqft: 850,  propertyId: 'test-prop-1' },
     { id: 'test-unit-1b', unitNumber: '1B', bedrooms: 1, bathrooms: 1,   sqft: 620,  propertyId: 'test-prop-1' },
     { id: 'test-unit-1c', unitNumber: '2A', bedrooms: 3, bathrooms: 1.5, sqft: 1100, propertyId: 'test-prop-1' },
     { id: 'test-unit-2a', unitNumber: '1',  bedrooms: 3, bathrooms: 2,   sqft: 1400, propertyId: 'test-prop-2' },
     { id: 'test-unit-3a', unitNumber: '1',  bedrooms: 2, bathrooms: 1,   sqft: 900,  propertyId: 'test-prop-3' },
     { id: 'test-unit-3b', unitNumber: '2',  bedrooms: 2, bathrooms: 1,   sqft: 900,  propertyId: 'test-prop-3' },
     { id: 'test-unit-4a', unitNumber: '101',bedrooms: 1, bathrooms: 1,   sqft: 700,  propertyId: 'test-prop-4' },
     { id: 'test-unit-4b', unitNumber: '102',bedrooms: 2, bathrooms: 2,   sqft: 1050, propertyId: 'test-prop-4' },
],
    toggleUnitButtonClicked: () =>
    set((state) => ({
        addUnitButtonClicked: !state.addUnitButtonClicked,
    })),
    appendUnitsArray: (newUnit: FormFields) => 
    set((state) => ({
        ...state,
        unitsArray: [...state.unitsArray, newUnit],
    })),
});