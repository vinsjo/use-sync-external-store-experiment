import { CounterDisplay } from './CounterDisplay';
import { useCounterStore } from './store/CounterStore';

import './App.css';

const { decrement, increment } = useCounterStore.getState();

setInterval(increment, 1000);

function App() {
  return (
    <div className='App'>
      <h1>
        <CounterDisplay />
      </h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default App;
