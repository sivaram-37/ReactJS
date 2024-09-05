import { useEffect, useState } from "react";

function convertToFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

export function useWeatherApi(location) {
	const [locationName, setLocationName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [weather, setWeather] = useState({});
	const [error, setError] = useState("");

	useEffect(() => {
		async function getWeather() {
			if (location.length <= 2) return setWeather({});
			try {
				setError("");
				setIsLoading(true);

				const geoRes = await fetch(
					`https://geocoding-api.open-meteo.com/v1/search?name=${location}`
				);
				const geoData = await geoRes.json();
				console.log(geoData);

				if (!geoData.results) throw new Error("Location not found");

				const { latitude, longitude, timezone, name, country_code } =
					geoData.results.at(0);

				setLocationName(`${name}, ${convertToFlag(country_code)}`);

				const weatherRes = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
				);

				const weatherData = await weatherRes.json();

				if (weatherData.error) throw new Error("Can't Fetch Weather");
				console.log(weatherData);

				setWeather(weatherData.daily);
			} catch (err) {
				console.log(err);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		getWeather();
	}, [location]);
	return { locationName, isLoading, weather, error };
}
