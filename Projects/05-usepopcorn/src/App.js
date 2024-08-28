import { useState } from "react";

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
	// eslint-disable-next-line
	const [movies, setMovies] = useState(tempMovieData);

	return (
		<>
			<Navbar movies={movies} />
			<Main movies={movies} />
		</>
	);
}

function Navbar({ movies }) {
	const [query, setQuery] = useState("");

	return (
		<nav className="nav-bar">
			<Logo />
			<SearchBox query={query} setQuery={setQuery} />
			<NumResult movies={movies} />
		</nav>
	);
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

function Main({ movies }) {
	return (
		<main className="main">
			<MovieBox movies={movies} />
			<WatchedBox />
		</main>
	);
}

function MovieBox({ movies }) {
	const [isOpen1, setIsOpen1] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
				{isOpen1 ? "–" : "+"}
			</button>

			{isOpen1 && <MovieList movies={movies} />}
		</div>
	);
}

function MovieList({ movies }) {
	return (
		<ul className="list">
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
}

function Movie({ movie }) {
	return (
		<li>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<ParaTagWithTwoSpanTag span1Emoji="🗓" span2Content={movie.Year} />
			</div>
		</li>
	);
}

function WatchedBox() {
	// eslint-disable-next-line
	const [watched, setWatched] = useState(tempWatchedData);
	const [isOpen2, setIsOpen2] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
				{isOpen2 ? "–" : "+"}
			</button>

			{isOpen2 && (
				<>
					<WatchedMoviesSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
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
				<WatchedMovie movie={movie} />
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
