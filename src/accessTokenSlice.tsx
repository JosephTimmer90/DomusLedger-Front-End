import type { StateCreator } from "zustand";
import type { BoundStore } from "./types";
import {
  ACCESS_TOKEN_REFRESH_INTERVAL_MS,
  createFakeAccessToken,
} from "./CreateAccessToken";

export interface authStoreSlice {
  accessToken: string | null;
  refreshTimerId: number | null;
  isRefreshing: boolean;
  generateAccessToken: () => Promise<string>;
  startAccessTokenRefresh: () => void;
  stopAccessTokenRefresh: () => void;
  clearAccessToken: () => void;
}

export const createAuthStoreSlice: StateCreator<
  BoundStore,
  [],
  [],
  authStoreSlice
> = (set, get) => ({
      accessToken: null,
      refreshTimerId: null,
      isRefreshing: false,

      generateAccessToken: async () => {
        const token = await createFakeAccessToken();
        set({ accessToken: token });
        return token;
      },

      startAccessTokenRefresh: () => {
        const existingToken = get().accessToken;
        const existingTimerId = get().refreshTimerId;

        if (
          existingToken !== null ||
          existingTimerId !== null ||
          typeof window === "undefined"
        ) {
          return;
        }

        set({ isRefreshing: true });

        const timerId = window.setTimeout(async () => {
          await get().generateAccessToken();
          set({ refreshTimerId: null, isRefreshing: false });
        }, ACCESS_TOKEN_REFRESH_INTERVAL_MS);

        set({ refreshTimerId: timerId });
      },

      stopAccessTokenRefresh: () => {
        const timerId = get().refreshTimerId;

        if (timerId !== null && typeof window !== "undefined") {
          window.clearTimeout(timerId);
        }

        set({ refreshTimerId: null, isRefreshing: false });
      },

      clearAccessToken: () => {
        const timerId = get().refreshTimerId;

        if (timerId !== null && typeof window !== "undefined") {
          window.clearTimeout(timerId);
        }

        set({ accessToken: null, refreshTimerId: null, isRefreshing: false });

        if (typeof window !== "undefined") {
          window.localStorage.removeItem("auth-storage");
        }
      },
    })
