/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };

		case "cities/loaded":
			return { ...state, cities: action.payload, isLoading: false };

		case "city/loaded":
			return { ...state, currentCity: action.payload, isLoading: false };

		case "city/created":
			return {
				...state,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
				isLoading: false,
			};

		case "city/deleted":
			return {
				...state,
				cities: [state.cities.filter((city) => city.id !== action.payload)],
				isLoading: false,
			};

		case "error":
			return { ...state, error: action.payload, isLoading: false };

		default:
			throw new Error("Unknown action type");
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });

			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({ type: "error", payload: "Failed to fetch cities from local server" });
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		if (currentCity.id === id) return;

		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({
				type: "error",
				payload: "There was an error while Loading the city...",
			});
		}
	}

	async function createCity(newCity) {
		dispatch({ type: "loading" });

		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({
				type: "error",
				payload: "There was an error while creating the city...",
			});
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });

		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({
				type: "error",
				payload: "There was an error while deleting the city...",
			});
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error("Trying to use CitiesContext out of CitiesProvider");
	return context;
}

export { CitiesProvider, useCities };
