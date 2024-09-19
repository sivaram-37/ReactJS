import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useURLPosition } from "../hooks/useURLPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesProvider";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.opencagedata.com/geocode/v1/json";
const API_KEY = "0dd8feb4b1e14a44b2495995697cb021";

function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const navigate = useNavigate();
	const { createCity, isLoading } = useCities();
	const [lat, lng] = useURLPosition();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [error, setError] = useState("");
	const [emoji, setEmoji] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");

	useEffect(
		function () {
			if (!lat && !lng) return;

			async function getCityData() {
				try {
					setIsLoadingData(true);
					setError("");
					const res = await fetch(`${BASE_URL}?q=${lat}+${lng}&key=${API_KEY}`);
					const data = await res.json();

					if (!data.results)
						throw new Error("🤦 It doesn't seem to be a city. Click somewhere else.");

					console.log(data);
					const {
						city,
						county,
						country_code: countryCode,
						country: countryName,
					} = data.results.at(0).components;
					setCityName(city || county || "");
					setCountry(countryName);
					setEmoji(convertToEmoji(countryCode));
				} catch (err) {
					setError(err.message);
				} finally {
					setIsLoadingData(false);
				}
			}
			getCityData();
		},
		[lat, lng]
	);

	async function handleSubmit(e) {
		e.preventDefault();
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		await createCity(newCity);

		navigate("/app/cities");
	}

	if (isLoadingData) return <Spinner />;

	if (!lat && !lng) return <Message message="Start by click some cities" />;

	if (error) return <Message message={error} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
