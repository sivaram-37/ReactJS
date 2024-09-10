function Progress({ index, numOfQuestions, points, maxPossiblePoints, answer }) {
	return (
		<header className="progress">
			<progress max={numOfQuestions} value={index + Number(answer !== null)} />

			<p>
				Question <strong>{index + 1}</strong>/<strong>{numOfQuestions}</strong>
			</p>

			<p>
				Points <strong>{points}</strong>/<strong>{maxPossiblePoints}</strong>
			</p>
		</header>
	);
}

export default Progress;
