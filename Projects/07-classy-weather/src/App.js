import { useEffect, useState } from "react";
import { useWeatherApi } from "./useWeatherApi";
import { useCurrentLocationWeather } from "./useCurrentLocationWeather";

export default function App() {
	const [location, setLocation] = useState("");

	const { getPosition, locationName1, isLoading1, weather1, error1 } =
		useCurrentLocationWeather();

	const { isLoading2, error2, locationName2, weather2 } = useWeatherApi(location);

	const error = error1 || error2;
	const isLoading = isLoading1 || isLoading2;

	useEffect(() => {
		const loc = localStorage.getItem("lastWeatherLocation");
		loc.length !== 0 ? setLocation(loc) : setLocation("");
	}, []);

	function handleInput(e) {
		getPosition(true);
		setLocation(e.target.value);
		localStorage.setItem("lastWeatherLocation", e.target.value);
	}

	function handleGetYourLocation() {
		setLocation("");
		localStorage.setItem("lastWeatherLocation", "");
		getPosition();
	}

	return (
		<div className="app">
			<h1>ClassY WeatheR</h1>
			<input
				type="text"
				placeholder="SearcH froM LocatioN"
				value={location}
				onChange={handleInput}
			/>

			<p className="or">Or</p>

			<button onClick={handleGetYourLocation}>ClicK FoR CurrenT LocatioN</button>

			{error && <p>{error}</p>}
			{isLoading && <p className="loader">LoadinG...</p>}
			{(weather1?.time && <Weather weather={weather1} cityName={locationName1} />) ||
				(weather2.time && <Weather weather={weather2} cityName={locationName2} />)}
		</div>
	);
}

function Weather({ weather, cityName }) {
	const {
		weathercode: codes,
		time: dates,
		temperature_2m_max: max,
		temperature_2m_min: min,
	} = weather;

	return (
		<>
			<h2>Weather In {cityName}</h2>
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
