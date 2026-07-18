import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';

export interface dashBoardSlice {
    count: number,
    computerBrand: string,
    incrementCount: () => void,
    decrementCount: () => void,
    changeComputerBrand: (newBrand: string) => void
}

export const createDashBoardSlice: StateCreator<
    BoundStore,
    [],
    [],
    dashBoardSlice
> = (set) => ({
    count: 0,
    computerBrand: 'HP',
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    changeComputerBrand: (newBrand: string) => set(() => ({ computerBrand: newBrand })),
});