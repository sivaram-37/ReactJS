import { useState, useEffect } from "react";

const API_KEY = "f84fc31d";

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		function () {
			const controller = new AbortController();

			async function fetchMovie() {
				try {
					setIsLoading(true);
					setError("");

					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
						{ signal: controller.signal }
					);

					if (!res.ok) throw new Error("Something went wrong!");

					const data = await res.json();
					if (data.Response === "False") throw new Error("Movies not found");

					setMovies(data.Search);
					setError("");
				} catch (err) {
					if (err.name !== "AbortError") {
						console.log(err.message);
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}

			// handleCloseMovie();
			fetchMovie();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return { movies, isLoading, error };
}
