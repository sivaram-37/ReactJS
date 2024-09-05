import { useEffect, useState } from "react";
import { useWeatherApi } from "./useWeatherApi";

export default function App() {
	const [location, setLocation] = useState("");

	const { locationName, isLoading, weather, error } = useWeatherApi(location);

	useEffect(() => {
		const loc = localStorage.getItem("lastWeatherLocation");
		loc.length !== 0 ? setLocation(loc) : setLocation("");
	}, []);

	function handleInput(e) {
		setLocation(e.target.value);
		localStorage.setItem("lastWeatherLocation", e.target.value);
	}

	return (
		<div className="app">
			<h1>Classy Weather</h1>
			<p>Search from Location</p>
			<input
				type="text"
				placeholder="Search from Location"
				value={location}
				onChange={handleInput}
			/>

			<p>Or</p>

			<button>Get Weather For Your Current Location</button>

			{error && <p>{error}</p>}
			{isLoading && <p className="loader">Loading...,</p>}
			{weather.time && <Weather locationName={locationName} weather={weather} />}
		</div>
	);
}

function Weather({ weather, locationName }) {
	const {
		weathercode: codes,
		time: dates,
		temperature_2m_max: max,
		temperature_2m_min: min,
	} = weather;

	return (
		<>
			<h2>Weather In {locationName}</h2>
			<ul className="weather">
				{dates.map((date, i) =>
					i === 0 ? (
						<Day
							key={date}
							date="Today"
							code={codes.at(i)}
							min={min.at(i)}
							max={max.at(i)}
						/>
					) : (
						<Day
							key={date}
							date={dates.at(i)}
							code={codes.at(i)}
							min={min.at(i)}
							max={max.at(i)}
						/>
					)
				)}
			</ul>
		</>
	);
}

function Day({ code, date, min, max }) {
	return (
		<li className={`day ${date === "Today" ? "important" : ""}`}>
			<span className="icon">{getWeatherIcon(code)}</span>
			<span className="date">{date === "Today" ? "Today" : formatDay(date)}</span>
			<p>
				{Math.floor(min)}&deg;c &mdash; <strong>{Math.ceil(max)}&deg;c</strong>
			</p>
		</li>
	);
}

function formatDay(dateStr) {
	return new Intl.DateTimeFormat("en", {
		weekday: "short",
	}).format(new Date(dateStr));
}

function getWeatherIcon(wmoCode) {
	const icons = new Map([
		[[0], "☀️"],
		[[1], "🌤"],
		[[2], "⛅️"],
		[[3], "☁️"],
		[[45, 48], "🌫"],
		[[51, 56, 61, 66, 80], "🌦"],
		[[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
		[[71, 73, 75, 77, 85, 86], "🌨"],
		[[95], "🌩"],
		[[96, 99], "⛈"],
	]);
	const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
	if (!arr) return "NOT FOUND";
	return icons.get(arr);
}
