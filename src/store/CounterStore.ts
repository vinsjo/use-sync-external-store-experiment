import { createUseBoundStore } from '../utils/store';

export interface ICounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = createUseBoundStore<ICounterStore>(
  (set) => ({
    count: 0,
    increment: () => set(({ count }) => ({ count: count + 1 })),
    decrement: () => set(({ count }) => ({ count: count - 1 })),
  }),
  (a, b) => a.count === b.count,
);
