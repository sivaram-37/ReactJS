import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
	const [searchParam, setSearchParam] = useSearchParams();
	const lat = searchParam.get("lat");
	const lng = searchParam.get("lng");

	const navigate = useNavigate();

	return (
		<div className={styles.mapContainer} onClick={() => navigate("form")}>
			<h1>Map</h1>
			<h1>
				Position : lat={lat},lng={lng}
			</h1>
			<button onClick={() => setSearchParam({ lat: 25, lng: 55 })}>
				Change Position
			</button>
		</div>
	);
}

export default Map;
