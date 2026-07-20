import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BoundStore } from './types';
import { createDashBoardSlice } from './dashBoardSlice';
import { createAuthStoreSlice } from './accessTokenSlice';
import { createLoginSlice } from './loginSlice';

export const useBoundStore = create<BoundStore>()(
    persist(
        (...a) => ({
        ...createDashBoardSlice(...a),
        ...createAuthStoreSlice(...a),
        ...createLoginSlice(...a),
    }),
    {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ accessToken: state.accessToken }),
    }
    )
);