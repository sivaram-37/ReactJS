import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const reducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(reducer);

export default store;
