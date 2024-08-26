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
  const [countSteps, setCountSteps] = useState(1);
  const [countCounter, setCountCounter] = useState(0);

  const date = new Date(2024, 8, 21);
  date.setDate(date.getDate() + countCounter);

  return (
    <div className="container">
      <div className="box">
        <h3>Steps : </h3>
        <button
          onClick={() => {
            if (countSteps > 1) setCountSteps((i) => i - 1);
          }}
        >
          -
        </button>
        <span>{countSteps} </span>
        <button onClick={() => setCountSteps((i) => i + 1)}> + </button>
      </div>
      <div className="box">
        <h3>Counter :</h3>
        <button onClick={() => setCountCounter((i) => i - countSteps)}> - </button>
        <span>{countCounter} </span>
        <button onClick={() => setCountCounter((i) => i + countSteps)}> + </button>
      </div>
      <div className="box">
        <h4>
          {countCounter === 0 && `Today is ${date.toDateString()}`}
          {countCounter > 0 &&
            `${countCounter} days from today is ${date.toDateString()}`}
          {countCounter < 0 &&
            `${Math.abs(countCounter)} days ago today was ${date.toDateString()}`}
        </h4>
      </div>
    </div>
  );
}
