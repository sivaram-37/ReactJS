import { createStore } from "redux";

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };

		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };

		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				balance: state.balance + action.payload.amount,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
			};

		case "account/payLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};

		default:
			return state;
	}
}

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
// 	type: "account/requestLoan",
// 	payload: { amount: 3000, purpose: "To buy a cheap car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
	store.dispatch({ type: "account/deposit", payload: amount });
}

function withdraw(amount) {
	store.dispatch({ type: "account/withdraw", payload: amount });
}

function requestLoan(amount, purpose) {
	store.dispatch({
		type: "account/requestLoan",
		payload: { amount, purpose },
	});
}

function payLoan() {
	store.dispatch({ type: "account/payLoan" });
}

deposit(500);
console.log(store.getState());

withdraw(200);
console.log(store.getState());

requestLoan(2500, "To buy a Bike");
console.log(store.getState());

payLoan();
console.log(store.getState());
