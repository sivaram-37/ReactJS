import { useQuiz } from "../contexts/QuizProvider";
import { useEffect } from "react";

function Timer() {
	const { secondsRemaining, dispatch } = useQuiz();

	const mins = Math.floor(secondsRemaining / 60);
	const secs = secondsRemaining % 60;

	useEffect(() => {
		const id = setInterval(() => dispatch({ type: "timertick" }), 1000);
		return () => clearInterval(id);
	}, [dispatch]);

	return (
		<div className="timer">
			{mins < 10 && "0"}
			{mins} : {secs < 10 && "0"}
			{secs}
		</div>
	);
}

export default Timer;
