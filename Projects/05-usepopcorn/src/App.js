import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "f84fc31d";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("interstellar");
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	function handleSelectedId(id) {
		setSelectedId((selectedId) => (selectedId === id ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	useEffect(
		function () {
			async function fetchMovie() {
				try {
					setIsLoading(true);
					setError("");

					const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);

					if (!res.ok) throw new Error("Something went wrong!");

					const data = await res.json();
					if (data.Response === "False") throw new Error("Movies not found");

					setMovies(data.Search);
				} catch (err) {
					setError(err.message);
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}

			fetchMovie();
		},
		[query]
	);

	return (
		<>
			<Navbar>
				<Logo />
				<SearchBox query={query} setQuery={setQuery} />
				<NumResult movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{error && <ErrorMsg message={error} />}
					{!isLoading && !error && (
						<MoviesList movies={movies} onSelectMovie={handleSelectedId} />
					)}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
					) : (
						<>
							<WatchedMoviesSummary watched={watched} />
							<WatchedMoviesList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function ErrorMsg({ message }) {
	return (
		<p className="error">
			<span>⛔</span>
			{message}
		</p>
	);
}

function Navbar({ children }) {
	return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function SearchBox({ query, setQuery }) {
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
}

function NumResult({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? "–" : "+"}
			</button>

			{isOpen && children}
		</div>
	);
}

function MoviesList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
}

function Movie({ movie, onSelectMovie }) {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<ParaTagWithTwoSpanTag span1Emoji="🗓" span2Content={movie.Year} />
			</div>
		</li>
	);
}

function MovieDetails({ selectedId, onCloseMovie }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
				);

				const data = await res.json();

				setMovie(data);

				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedId]
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`${title} poster`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>{imdbRating} IMDB rating</span>
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							<StarRating maxRating={10} size={24} />
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed By {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

function WatchedMoviesSummary({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<ParaTagWithTwoSpanTag
					span1Emoji="#️⃣"
					span2Content={`${watched.length} movies`}
				/>
				<ParaTagWithTwoSpanTag span1Emoji="⭐️" span2Content={avgImdbRating} />
				<ParaTagWithTwoSpanTag span1Emoji="🌟" span2Content={avgUserRating} />
				<ParaTagWithTwoSpanTag span1Emoji="⏳" span2Content={`${avgRuntime} min`} />
			</div>
		</div>
	);
}

function WatchedMoviesList({ watched }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
}

function WatchedMovie({ movie }) {
	return (
		<li key={movie.imdbID}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<ParaTagWithTwoSpanTag span1Emoji="⭐️" span2Content={movie.imdbRating} />
				<ParaTagWithTwoSpanTag span1Emoji="🌟" span2Content={movie.userRating} />
				<ParaTagWithTwoSpanTag span1Emoji="⏳" span2Content={`${movie.runtime} min`} />
			</div>
		</li>
	);
}

function ParaTagWithTwoSpanTag({ span1Emoji, span2Content }) {
	return (
		<p>
			<span>{span1Emoji}</span>
			<span>{span2Content}</span>
		</p>
	);
}
