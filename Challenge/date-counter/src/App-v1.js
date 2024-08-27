import { useState } from "react";

export default function AppV1() {
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
      <div className="box step">
        <button
          onClick={() => {
            if (step > 1) setStep((i) => i - 1);
          }}
        >
          -
        </button>
        <h3>Steps : {step}</h3>

        <button onClick={() => setStep((i) => i + 1)}> + </button>
      </div>

      <div className="box counter">
        <button onClick={() => setCount((i) => i - step)}> - </button>
        <h3>Counter : {count} </h3>
        <button onClick={() => setCount((i) => i + step)}> + </button>
      </div>

      <div className="box disp">
        <h4>
          {count === 0 && `Today is ${date.toDateString()}`}
          {count > 0 && `${count} days from today is ${date.toDateString()}`}
          {count < 0 && `${Math.abs(count)} days ago today was ${date.toDateString()}`}
        </h4>
      </div>
    </div>
  );
}
