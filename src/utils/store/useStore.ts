import { useSyncExternalStore, EqualityChecker } from '../../hooks/useSyncExternalStore';
import { IStore } from './types';

export const useStore = <T>(store: IStore<T>, isEqual?: EqualityChecker<T>): T => {
  return useSyncExternalStore(store.subscribe, store.getState, isEqual);
};
