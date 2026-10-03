import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BoundStore } from './types';
import { createDashBoardSlice } from './dashBoardSlice';
import { createAuthStoreSlice } from './accessTokenSlice';
import { createLoginSlice } from './loginSlice';
import { createPropertiesSlice} from './propertiesSlice';
import { createbrowserSlice } from './browserSlice';
import { createTenantsSlice } from './tenantsSlice';
import { createLeasesSlice } from './leasesSlice';
import { createUnitsSlice } from './unitsSlice';
import { createPaymentsSlice } from './paymentsSlice';
import { createExpensesSlice } from './expensesSlice';
import { createSecDepositsSlice } from './secDepositsSlice';

export const useBoundStore = create<BoundStore>()(
    persist(
        (...a) => ({
        ...createDashBoardSlice(...a),
        ...createAuthStoreSlice(...a),
        ...createLoginSlice(...a),
        ...createPropertiesSlice(...a),
        ...createbrowserSlice(...a),
        ...createTenantsSlice(...a),
        ...createLeasesSlice(...a),
        ...createUnitsSlice(...a),
        ...createPaymentsSlice(...a),
        ...createExpensesSlice(...a),
        ...createSecDepositsSlice(...a)
    }),
    {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ accessToken: state.accessToken }),
    }
    )
);