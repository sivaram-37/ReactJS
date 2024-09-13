import { useQuiz } from "../contexts/QuizProvider";

function FinishScreen() {
	const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

	const percentage = (points / maxPossiblePoints) * 100;

	let emoji;
	if (percentage === 100) emoji = "🥇";
	else if (percentage > 80) emoji = "🥳";
	else if (percentage > 50) emoji = "😁";
	else if (percentage > 10) emoji = "🤔";
	else if (percentage >= 0) emoji = "🤦";

	return (
		<>
			<p className="result">
				<span>{emoji}</span>You have scored {points} out of {maxPossiblePoints}. (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(Highscore : {highscore})</p>
			<button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
				Restart quiz
			</button>
		</>
	);
}

export default FinishScreen;
