import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKeydown } from "./useKeydown";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "f84fc31d";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	// Custom hook to get movies from API
	const { movies, isLoading, error } = useMovies(query);

	// Custom hook to store watchedMovie in localStorage and also get watchedMovie from localStorage
	const [watched, setWatched] = useLocalStorageState([], "watched");

	function handleSelectedId(id) {
		setSelectedId((selectedId) => (selectedId === id ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddToWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteMovie(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

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
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddToWatched={handleAddToWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedMoviesSummary watched={watched} />
							<WatchedMoviesList watched={watched} onDeleteMovie={handleDeleteMovie} />
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
	const inputEl = useRef(null);

	useEffect(() => inputEl.current.focus(), []);

	// Custom hook to lesson for Enter key
	useKeydown("Enter", () => {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setQuery("");
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
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
		<li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<ParaTagWithTwoSpanTag span1Emoji="🗓" span2Content={movie.Year} />
			</div>
		</li>
	);
}

function MovieDetails({ selectedId, onCloseMovie, onAddToWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setuserRating] = useState("");

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const getuserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

	const countRef = useRef(0);

	useEffect(() => {
		if (userRating) countRef.current++;
	}, [userRating]);

	function handleAdd() {
		const newMovie = {
			imdbID: selectedId,
			title,
			runtime: Number(runtime.split(" ").at(0)),
			userRating: Number(userRating),
			imdbRating,
			poster,
			CountRatingDecisions: countRef,
		};
		onAddToWatched(newMovie);
		onCloseMovie();
	}

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	// Custom hook to lesson for Escape key
	useKeydown("Escape", onCloseMovie);

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

	useEffect(
		function () {
			if (!title) return;

			document.title = `Movie | ${title}`;

			//Cleanup function
			return function () {
				document.title = "usePopcorn";
			};
		},
		[title]
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
							{!isWatched ? (
								<>
									<StarRating maxRating={10} size={24} onSetRating={setuserRating} />

									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie with {getuserRating} <span>⭐</span>
								</p>
							)}
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
				<ParaTagWithTwoSpanTag span1Emoji="⭐️" span2Content={avgImdbRating.toFixed(1)} />
				<ParaTagWithTwoSpanTag span1Emoji="🌟" span2Content={avgUserRating.toFixed(1)} />
				<ParaTagWithTwoSpanTag
					span1Emoji="⏳"
					span2Content={`${avgRuntime.toFixed(2)} min`}
				/>
			</div>
		</div>
	);
}

function WatchedMoviesList({ watched, onDeleteMovie }) {
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedMovie movie={movie} key={movie.imdbID} onDeleteMovie={onDeleteMovie} />
			))}
		</ul>
	);
}

function WatchedMovie({ movie, onDeleteMovie }) {
	return (
		<li key={movie.imdbID}>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<ParaTagWithTwoSpanTag span1Emoji="⭐️" span2Content={movie.imdbRating} />
				<ParaTagWithTwoSpanTag span1Emoji="🌟" span2Content={movie.userRating} />
				<ParaTagWithTwoSpanTag span1Emoji="⏳" span2Content={`${movie.runtime} min`} />
			</div>
			<button className="btn-delete" onClick={() => onDeleteMovie(movie.imdbID)}>
				x
			</button>
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
