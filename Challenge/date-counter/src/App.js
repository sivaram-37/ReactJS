import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="container">
      {/* <div className="box">
        <button
          onClick={() => {
            if (step > 1) setStep((i) => i - 1);
          }}
        >
          -
        </button>
        <h3>Steps : {step}</h3>

        <button onClick={() => setStep((i) => i + 1)}> + </button>
      </div> */}

      {/* <div className="box">
        <button onClick={() => setCount((i) => i - step)}> - </button>
        <h3>Counter : {count} </h3>
        <button onClick={() => setCount((i) => i + step)}> + </button>
      </div> */}

      <div className="box step">
        <h3>Steps : </h3>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <h3>{step}</h3>
      </div>

      <div className="box counter">
        <h3>Counter : </h3>
        <button onClick={() => setCount((i) => i - step)}> - </button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((i) => i + step)}> + </button>
      </div>

      <div className="box disp">
        <h4>
          {count === 0 && `Today is ${date.toDateString()}`}
          {count > 0 && `${count} days from today is ${date.toDateString()}`}
          {count < 0 && `${Math.abs(count)} days ago today was ${date.toDateString()}`}
        </h4>
      </div>

      {count !== 0 || step !== 1 ? (
        <div className="box">
          <button
            onClick={(e) => {
              setCount(0);
              setStep(1);
            }}
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
}
