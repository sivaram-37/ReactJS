/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useCities } from "../Contexts/CitiesProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useURLPosition } from "../hooks/useURLPosition";

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([13.0843, 80.2705]);
	const [mapLat, mapLng] = useURLPosition();
	const {
		getPosition,
		isLoading: isPositionLoading,
		position: currentPosition,
	} = useGeolocation();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (currentPosition) setMapPosition([currentPosition.lat, currentPosition.lng]);
		},
		[currentPosition]
	);

	return (
		<div className={styles.mapContainer}>
			{!currentPosition && (
				<Button type="position" onClick={getPosition}>
					{isPositionLoading ? "Loading..." : "Use Your Location"}
				</Button>
			)}
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCity position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCity({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
