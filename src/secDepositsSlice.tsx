import type { StateCreator } from "zustand";
import type { BoundStore } from "./types";

export interface newSecDeposit {
  id: string;
  leaseId: string;
  secDepositCents: bigint;
  heldSince: Date;
  status: string;
  dateReturned: Date | null;
}

export interface processReturnFormObject {
  onClick: () => void;
  id: string;
  leaseId: string;
  secDepositCents: bigint;
}

export interface secDepositsSlice {
  formButtonClicked: boolean;
  secDepositsArray: newSecDeposit[];
  openSecDepositId: string|null;
  toggleForm: () => void;
  appendSecDepositsArray: (newsecDeposit: newSecDeposit) => void;
  updateSecDeposit: (id: string, updates: Partial<newSecDeposit>) => void;
  markSecDepositReturned: (id: string) => void;
  updateOpenSecDepositId: (depositId: string|null) => void;
}

export const createSecDepositsSlice: StateCreator<
  BoundStore,
  [],
  [],
  secDepositsSlice
> = (set) => ({
  formButtonClicked: false,
  secDepositsArray: [
    {
      id: "sec-deposit-1",
      leaseId: "test-lease-1",
      secDepositCents: BigInt(145000),
      heldSince: new Date("10/3/2026"),
      status: "Held",
      dateReturned: null,
    },
    {
      id: "sec-deposit-2",
      leaseId: "test-lease-2",
      secDepositCents: BigInt(110000),
      heldSince: new Date("10/3/2026"),
      status: "Held",
      dateReturned: null,
    },
    {
      id: "sec-deposit-3",
      leaseId: "test-lease-3",
      secDepositCents: BigInt(175000),
      heldSince: new Date("10/3/2024"),
      status: "Returned",
      dateReturned: new Date("10/3/2026"),
    },
    {
      id: "sec-deposit-4",
      leaseId: "test-lease-4",
      secDepositCents: BigInt(220000),
      heldSince: new Date("10/3/2026"),
      status: "Held",
      dateReturned: null,
    },
    {
      id: "sec-deposit-5",
      leaseId: "test-lease-5",
      secDepositCents: BigInt(135000),
      heldSince: new Date("10/3/2026"),
      status: "Held",
      dateReturned: null,
    },
    {
      id: "sec-deposit-6",
      leaseId: "test-lease-6",
      secDepositCents: BigInt(165000),
      heldSince: new Date("10/3/2026"),
      status: "Held",
      dateReturned: null,
    },
  ],
  openSecDepositId: null,
  toggleForm: () =>
    set((state) => ({
      formButtonClicked: !state.formButtonClicked,
    })),
  appendSecDepositsArray: (newSecDeposit: newSecDeposit) =>
    set((state) => ({
      secDepositsArray: [...state.secDepositsArray, newSecDeposit],
    })),
  updateSecDeposit: (id: string, updates: Partial<newSecDeposit>) =>
    set((state) => ({
      secDepositsArray: state.secDepositsArray.map((deposit) =>
        deposit.id === id ? { ...deposit, ...updates } : deposit,
      ),
    })),
  markSecDepositReturned: (id: string) =>
    set((state) => ({
      secDepositsArray: state.secDepositsArray.map((deposit) =>
        deposit.id === id
          ? {
              ...deposit,
              status: "Returned",
              dateReturned: new Date(),
            }
          : deposit,
      ),
    })),
  updateOpenSecDepositId: (depositId: string|null) =>
    set(() => ({
      openSecDepositId: depositId,
    })),
});
