import type { StateCreator } from 'zustand';
import type { BoundStore } from './types';

export interface loginSlice {
    userName: string;
    passWord: string;
    failedAuthMessage: string;
    authenticated: boolean;
    updateUserName: (newUserName: string) => void,
    updatePassWord: (newPassWord: string) => void,
    authenticateUNAndP: (credentials: { userName: string; passWord: string }) => boolean,
    updateFailedAuthMessage: (newFailedAuthMessage: string) => void,
    handleClear: () => void;

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
    authenticated: false,
    updateUserName: (newUserName: string) => set(() => ({ userName: newUserName})),
    updatePassWord: (newPassWord: string) => set(() => ({passWord: newPassWord})),
    authenticateUNAndP: ({ userName, passWord }) => {
        const isAuthenticated = userName === 'John@goog.com' && passWord === 'password';
        set(() => ({ authenticated: isAuthenticated }));
        return isAuthenticated;
    },
    updateFailedAuthMessage: (newFailedAuthMessage: string) => set(() => ({failedAuthMessage: newFailedAuthMessage})),
    handleClear: () => set(() => ({userName: '', passWord: '', authenticated: false})),
})
