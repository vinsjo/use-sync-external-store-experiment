import React, { useRef } from 'react';
import { useCounterStore } from './store/CounterStore';

export const CounterDisplay: React.FC = () => {
  const { count } = useCounterStore();

  return <>{count}</>;
};
