import { EqualityChecker } from '../../hooks/useSyncExternalStore';
import { IStore, IUseBoundStore, StoreInitializer } from './types';
import { useStore } from './useStore';

export const createStore = <T>(initializer: StoreInitializer<T>): IStore<T> => {
  let state: T;

  const listeners: Set<(state: T, prevState: T) => void> = new Set();

  const getState: IStore<T>['getState'] = () => state;

  const setState: IStore<T>['setState'] = (partial) => {
    const nextState =
      typeof partial === 'function' ? (partial as (state: T) => T | Partial<T>)(state) : partial;
    if (Object.is(state, nextState)) return;
    const prevState = state;
    state = typeof nextState !== 'object' ? (nextState as T) : Object.assign({}, state, nextState);
    listeners.forEach((listener) => listener(state, prevState));
  };

  const subscribe: IStore<T>['subscribe'] = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = initializer(setState, getState);

  return { getState, setState, subscribe };
};

export const createUseBoundStore = <T>(
  initializer: StoreInitializer<T>,
  defaultEqualityChecker?: EqualityChecker<T>,
): IUseBoundStore<T> => {
  const store = createStore(initializer);

  const useBoundStore: Omit<IUseBoundStore<T>, keyof IStore<T>> = (
    isEqual = defaultEqualityChecker,
  ) => useStore(store, isEqual);

  return Object.assign(useBoundStore, store) as IUseBoundStore<T>;
};
