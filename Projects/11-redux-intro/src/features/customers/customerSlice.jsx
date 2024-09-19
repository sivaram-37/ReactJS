import store from "../../Store";

const initialStateCustomer = {
	fullName: "",
	nationalID: "",
	createdOn: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationalID) {
	store.dispatch({
		type: "customer/createCustomer",
		payload: { fullName, nationalID, createdOn: new Date().toISOString() },
	});
}

export function updateName(updatedFullName) {
	store.dispatch({ type: "customer/updateName", payload: updatedFullName });
}
