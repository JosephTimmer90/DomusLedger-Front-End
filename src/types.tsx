import type { dashBoardSlice } from "./dashBoardSlice";
import type { authStoreSlice } from "./accessTokenSlice";
import type { loginSlice } from './loginSlice';
import type { propertiesSlice } from './propertiesSlice';
import type { browserSlice } from './browserSlice';
import type { tenantsSlice } from "./tenantsSlice";
import type { leasesSlice } from "./leasesSlice";
import type { unitsSlice } from "./unitsSlice";
import type { paymentsSlice } from "./paymentsSlice"
import type { expensesSlice } from "./expensesSlice";
import type { secDepositsSlice } from "./secDepositsSlice";

export type BoundStore = 
    dashBoardSlice 
    & authStoreSlice 
    & loginSlice 
    & propertiesSlice
    & browserSlice
    &tenantsSlice
    &leasesSlice
    &unitsSlice
    &paymentsSlice
    &expensesSlice
    &secDepositsSlice;
