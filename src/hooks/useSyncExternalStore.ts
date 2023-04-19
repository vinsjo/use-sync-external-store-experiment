import { useState, useEffect, useCallback } from 'react';

export type EqualityChecker<T> = (a: T, b: T) => boolean;

export const useSyncExternalStore = <T>(
  subscribe: (notify: () => void) => () => void,
  getSnapshot: () => T,
  isEqual?: EqualityChecker<T>,
): T => {
  const [snapshot, setSnapshot] = useState(getSnapshot);

  const updateSnapshot = useCallback(() => {
    const newSnapshot = getSnapshot();
    setSnapshot((prevSnapshot) =>
      isEqual?.(prevSnapshot, newSnapshot) ? prevSnapshot : newSnapshot,
    );
  }, [getSnapshot, isEqual]);

  useEffect(() => subscribe(updateSnapshot), [subscribe, updateSnapshot]);

  return snapshot;
};
