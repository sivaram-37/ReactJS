import { useEffect, useState } from "react";

import { useURLPosition } from "../hooks/useURLPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
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
			async function getCityData() {
				try {
					setIsLoadingData(true);
					setError("");
					const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error("🤦 It doesn't seem to be a city. Click somewhere else.");

					setCityName(data.city || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
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

	if (isLoadingData) return <Spinner />;

	if (error) return <Message message={error} />;

	return (
		<form className={styles.form}>
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
				<input id="date" onChange={(e) => setDate(e.target.value)} value={date} />
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
