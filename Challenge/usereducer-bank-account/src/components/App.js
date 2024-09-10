import { useReducer, useState } from "react";
import Header from "./Header";
import DisplayScreen from "./DisplayScreen";
import Operations from "./Operations";
import OpenAccount from "./OpenAccount";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import RequestLoan from "./RequestLoan";
import PayLoan from "./PayLoan";
import CloseAccount from "./CloseAccount";

const initialState = {
	balance: 0,
	loan: 0,
	isActive: false,
};

const OPEN_BALANCE = 500;

function reducer(state, action) {
	if (!state.isActive && action.type !== "openAccount") return state;

	switch (action.type) {
		case "openAccount":
			return { ...state, isActive: true, balance: OPEN_BALANCE };

		case "deposit":
			return { ...state, balance: state.balance + action.payload };

		case "withdraw":
			return { ...state, balance: state.balance - action.payload };

		case "requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				loan: state.loan + action.payload,
				balance: state.balance + action.payload,
			};

		case "payLoan":
			return {
				...state,
				loan: 0,
				balance: state.balance - state.loan,
			};

		case "closeAccount":
			if (state.loan > 0 || state.balance !== 0) return state;
			return initialState;

		default:
			throw new Error("Unknown action type");
	}
}

export default function App() {
	const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);

	const [depositAmount, setDepositAmount] = useState("");
	const [withdraw, setWithdraw] = useState("");
	const [reqLoan, setReqLoan] = useState("");

	return (
		<div>
			<Header />
			<DisplayScreen balance={balance} loan={loan} />
			<Operations>
				<OpenAccount dispatch={dispatch} isActive={isActive} />
				<Deposit
					dispatch={dispatch}
					isActive={isActive}
					depositAmount={depositAmount}
					setDepositAmount={setDepositAmount}
				/>
				<Withdraw
					dispatch={dispatch}
					isActive={isActive}
					withdraw={withdraw}
					setWithdraw={setWithdraw}
				/>
				<RequestLoan
					dispatch={dispatch}
					isActive={isActive}
					reqLoan={reqLoan}
					setReqLoan={setReqLoan}
				/>
				<PayLoan dispatch={dispatch} isActive={isActive} />
				<CloseAccount dispatch={dispatch} isActive={isActive} />
			</Operations>
		</div>
	);
}
