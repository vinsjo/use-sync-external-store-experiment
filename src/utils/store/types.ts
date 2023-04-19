import { EqualityChecker } from '../../hooks/useSyncExternalStore';

export interface IStore<T> {
  getState: () => T;
  setState: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

export interface IUseBoundStore<T> extends IStore<T> {
  (isEqual?: EqualityChecker<T>): T;
}

export type StoreInitializer<T> = (
  setState: IStore<T>['setState'],
  getState: IStore<T>['getState'],
) => T;
