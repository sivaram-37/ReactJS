import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skills = [
  { name: "7x Champion", level: "abvanced", bgColor: "blue" },
  { name: "Music Producer", level: "beginner", bgColor: "yellowgreen" },
  { name: "Bike racing", level: "intermediate", bgColor: "green" },
  { name: "104 Poles", level: "abvanced", bgColor: "skyblue" },
  { name: "105 Grand prix win", level: "abvanced", bgColor: "lightgreen" },
];

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
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill name={skill.name} bgColor={skill.bgColor} level={skill.level} />
      ))}
    </ul>
  );
}

function Skill({ name, bgColor, level }) {
  return (
    <li className="skill" style={{ backgroundColor: bgColor }}>
      <span>{name}</span>
      <span>
        {level === "beginner" && "🍼"}
        {level === "intermediate" && "👍"}
        {level === "abvanced" && "🔥"}
      </span>
    </li>
  );
}
