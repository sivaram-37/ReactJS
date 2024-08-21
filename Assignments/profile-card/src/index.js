import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <div className="card">
      <Avater />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avater() {
  return <img className="avatar" src="hamilton.jpg" alt="lewis hamilton" />;
}

function Intro() {
  return (
    <div>
      <h1>lewis hamilton</h1>
      <p>
        Sir Lewis Carl Davidson Hamilton MBE (born 7 January 1985 in Stevenage,
        Hertfordshire, England) is a British Formula One racing driver, currently racing
        for the Mercedes AMG Petronas team. A seven-time World Champion, he is often
        regarded as one of the greatest F1 drivers in history.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill name="GOAT F1 Driver" emoij="😂" bgColor="skyblue" />
      <Skill name="7x Champion" emoij="🎉" bgColor="red" />
      <Skill name="Producer" emoij="👍" bgColor="yellow" />
      <Skill name="Millioner" emoij="👍" bgColor="green" />
      <Skill name="105 Grand prix win" emoij="🎉" bgColor="orange" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.bgColor }}>
      <span>{props.name}</span>
      <span>{props.emoij}</span>
    </div>
  );
}
