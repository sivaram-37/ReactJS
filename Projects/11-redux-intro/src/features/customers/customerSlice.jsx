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
	return {
		type: "customer/createCustomer",
		payload: { fullName, nationalID, createdOn: new Date().toISOString() },
	};
}

export function updateName(updatedFullName) {
	return { type: "customer/updateName", payload: updatedFullName };
}
