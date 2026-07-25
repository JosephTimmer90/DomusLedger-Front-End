import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';

export interface loginSlice {
    userName: string;
    passWord: string;
    failedAuthMessage: string;
    updateUserName: (newUserName: string) => void,
    updatePassWord: (newPassWord: string) => void,
    updateFailedAuthMessage: (newFailedAuthMessage: string) => void

}

export const createLoginSlice: StateCreator<
    BoundStore,
    [],
    [],
    loginSlice
> = (set) => ({
    userName: '',
    passWord: '',
    failedAuthMessage: '',
    updateUserName: (newUserName: string) => set(() => ({ userName: newUserName})),
    updatePassWord: (newPassWord: string) => set(() => ({passWord: newPassWord})),
    updateFailedAuthMessage: (newFailedAuthMessage: string) => set(() => ({failedAuthMessage: newFailedAuthMessage})),
})
