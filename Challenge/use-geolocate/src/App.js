import { useState } from "react";
import { useGeolocate } from "./useGeolocate";

export default function App() {
	const [countClicks, setCountClicks] = useState(0);

	const {
		isLoading,
		position: { lat, lng },
		error,
		getPosition,
	} = useGeolocate();

	function handleClick() {
		setCountClicks(countClicks + 1);
		getPosition();
	}

	return (
		<div className="container">
			<button className="btn" onClick={handleClick} disabled={isLoading}>
				Get my position
			</button>

			{isLoading && <p>Loading position...</p>}
			{error && <p>{error}</p>}
			{!isLoading && !error && lat && lng && (
				<p>
					Your GPS position:{" "}
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
					>
						{lat}, {lng}
					</a>
				</p>
			)}

			<p>You requested position {countClicks} times</p>
		</div>
	);
}
