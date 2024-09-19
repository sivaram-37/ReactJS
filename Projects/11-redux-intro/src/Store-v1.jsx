import { combineReducers, createStore } from "redux";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdOn: "",
};

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdOn: action.payload.createdOn,
			};
		case "customer/updateName":
			return { ...state, fullName: action.payload };
		default:
			return state;
	}
}

function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };

		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };

		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				loan: action.payload.amount,
				balance: state.balance + action.payload.amount,
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

const reducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

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

function createCustomer(fullName, nationalID) {
	store.dispatch({
		type: "customer/createCustomer",
		payload: { fullName, nationalID, createdOn: new Date().toISOString() },
	});
}

function updateName(updatedFullName) {
	store.dispatch({ type: "customer/updateName", payload: updatedFullName });
}

createCustomer("sivaram", "12341");
deposit(600);
console.log(store.getState());
updateName("sivaram.v");
console.log(store.getState());
