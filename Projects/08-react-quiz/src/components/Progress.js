import { useQuiz } from "../contexts/QuizProvider";

function Progress() {
	const { index, numOfQuestions, points, maxPossiblePoints, answer } = useQuiz();

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
