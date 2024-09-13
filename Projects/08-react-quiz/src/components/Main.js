import { useQuiz } from "../contexts/QuizProvider";

import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Loader from "./Loader";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";

function Main() {
	const { status } = useQuiz();

	return (
		<div className="main">
			{status === "loading" && <Loader />}
			{status === "error" && <Error />}
			{status === "ready" && <StartScreen />}
			{status === "active" && (
				<>
					<Progress />
					<Question />
					<Footer />
				</>
			)}
			{status === "finished" && <FinishScreen />}
		</div>
	);
}

export default Main;
