import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./Store.jsx";

store.dispatch({ type: "account/deposit", payload: 300 });
console.log(store.getState());

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
