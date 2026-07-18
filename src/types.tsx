import type { dashBoardSlice } from "./dashBoardSlice";
import type { authStoreSlice } from "./accessTokenSlice";
import type { loginSlice } from './loginSlice';

export type BoundStore = dashBoardSlice & authStoreSlice & loginSlice;
