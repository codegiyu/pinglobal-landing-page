'use client';

import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { SelectorFn } from '../types/general';
import type { IPopulatedBillboard } from '../constants/endpoints';

export interface BillboardsStore {
  billboards: IPopulatedBillboard[];
  loading: boolean;
  error: string | null;
  actions: {
    setBillboards: (billboards: IPopulatedBillboard[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
  };
}

const initialData: Omit<BillboardsStore, 'actions'> = {
  billboards: [],
  loading: false,
  error: null,
};

export const useInitBillboardsStore = create<BillboardsStore>()(set => ({
  ...initialData,
  actions: {
    setBillboards: billboards => set({ billboards }),
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    reset: () => set(initialData),
  },
}));

export const useBillboardsStore = <T>(selector: SelectorFn<BillboardsStore, T>) => {
  const state = useInitBillboardsStore(useShallow(selector));
  return state;
};
