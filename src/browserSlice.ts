import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';

export interface browserSlice {
    screenWidth: number,
    updateScreenWidth: () => void
}

export const createbrowserSlice: StateCreator<
    BoundStore,
    [],
    [],
    browserSlice
> = (set) => ({
    screenWidth: window.innerWidth,
    updateScreenWidth: () => set((state) => ({...state, screenWidth: window.innerWidth} )),
});