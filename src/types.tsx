import type { dashBoardSlice } from "./dashBoardSlice";
import type { authStoreSlice } from "./accessTokenSlice";
import type { loginSlice } from './loginSlice';
import type { propertiesSlice } from './propertiesSlice';
import type { browserSlice } from './browserSlice';
import type { tenantsSlice } from "./tenantsSlice";

export type BoundStore = 
    dashBoardSlice 
    & authStoreSlice 
    & loginSlice 
    & propertiesSlice
    & browserSlice
    &tenantsSlice;
