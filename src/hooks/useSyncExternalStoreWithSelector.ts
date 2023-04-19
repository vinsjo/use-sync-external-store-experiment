import { useMemo } from 'react';
import { useSyncExternalStore } from './useSyncExternalStore';

export const useSyncExternalStoreWithSelector = <Snapshot, Selection>(
  subscribe: (notify: () => void) => () => void,
  getSnapshot: () => Snapshot,
  selector: (snapshot: Snapshot) => Selection,
  isEqual?: (a: Selection, b: Selection) => boolean,
): Selection => {
  const getSelection = useMemo(() => {
    let hasMemo = false;
    let memoizedSnapshot: Snapshot;
    let memoizedSelection: Selection;

    const memoizedSelector = (nextSnapshot: Snapshot): Selection => {
      if (hasMemo && Object.is(memoizedSnapshot, nextSnapshot)) {
        return memoizedSelection;
      }

      const nextSelection = selector(nextSnapshot);

      memoizedSelection = nextSelection;
      memoizedSnapshot = nextSnapshot;

      hasMemo = true;

      return nextSelection;
    };

    return () => memoizedSelector(getSnapshot());
  }, [getSnapshot, selector]);

  const value = useSyncExternalStore(subscribe, getSelection, isEqual);

  return value;
};
