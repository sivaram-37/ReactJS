import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
	const [movieRating, setMovieRating] = useState(0);

	return (
		<div>
			<StarRating maxRating={10} size={28} onSetRating={setMovieRating} />
			<p>This movie was rated {movieRating} rating</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <App /> */}

		<StarRating
			maxRating={5}
			size={30}
			color="#fcc419"
			className="test"
			message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
			defaultRating={3}
		/>

		<Test />
	</React.StrictMode>
);
