import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';

export interface loginSlice {
    userName: string;
    passWord: string;
    updateUserName: (newUserName: string) => void,
    updatePassWord: (newPassWord: string) => void

}

export const createLoginSlice: StateCreator<
    BoundStore,
    [],
    [],
    loginSlice
> = (set) => ({
    userName: '',
    passWord: '',
    updateUserName: (newUserName: string) => set(() => ({ userName: newUserName})),
    updatePassWord: (newPassWord: string) => set(() => ({passWord: newPassWord})),
})
