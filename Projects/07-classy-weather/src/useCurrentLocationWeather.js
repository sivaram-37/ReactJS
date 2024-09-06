import { useState } from "react";

const API_KEY = "0dd8feb4b1e14a44b2495995697cb021";

function convertToFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

export function useCurrentLocationWeather() {
	const [error1, setError1] = useState("");
	const [isLoading1, setIsLoading1] = useState("");
	const [locationName1, setLocationName1] = useState("");
	const [weather1, setWeather1] = useState({});

	function getPosition(searchFromLocation = false) {
		setIsLoading1(true);
		setError1("");

		if (searchFromLocation) return setWeather1({});

		if (!navigator.geolocation)
			throw new Error("Geolocation is not supported in your browser!");

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				console.log(pos.coords);
				const res = await fetch(
					`https://api.opencagedata.com/geocode/v1/json?q=${pos.coords.latitude}+${pos.coords.longitude}&key=${API_KEY}`
				);
				const data = await res.json();
				const { county: name } = data.results.at(0).components;
				const { country_code } = data.results.at(0).components;

				console.log(`${name}, ${convertToFlag(country_code)}`);
				setLocationName1(`${name}, ${convertToFlag(country_code)}`);

				const weatherRes = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min`
				);

				const weatherData = await weatherRes.json();

				if (weatherData.error) throw new Error("Can't Fetch Weather");

				setWeather1(weatherData.daily);
				setIsLoading1(false);
			},
			(err) => {
				console.log(err.message);
				setError1(err.message);
				setIsLoading1(false);
			}
		);
	}

	return { getPosition, isLoading1, error1, locationName1, weather1 };
}
