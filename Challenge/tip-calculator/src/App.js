import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [yourTip, setYourTip] = useState("0");
  const [othersTip, setOthersTip] = useState("0");

  const tip = amount * ((yourTip + othersTip) / 2 / 100);

  function handleReset() {
    setAmount("");
    setYourTip("0");
    setOthersTip("0");
  }

  return (
    <div>
      <Bill amount={amount} setAmount={setAmount} />

      <Tip tip={yourTip} setTip={setYourTip}>
        How did you like the service?
      </Tip>

      <Tip tip={othersTip} setTip={setOthersTip}>
        How did your friend like the service?
      </Tip>

      {amount && (
        <>
          <Total amount={amount} tip={tip} />

          <Reset amount={amount} onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ amount, setAmount }) {
  return (
    <p>
      How much was the bill?
      <input
        type="text"
        placeholder="Bill Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </p>
  );
}

function Tip({ tip, setTip, children }) {
  return (
    <p>
      {children}
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing (20%)</option>
      </select>
    </p>
  );
}

function Total({ amount, tip }) {
  return (
    <h2>
      You Pay ${amount + tip} (${amount} + ${tip} tip)
    </h2>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
