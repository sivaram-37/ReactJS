import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fullName: "",
	nationalID: "",
	createdOn: "",
};

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		createCustomer: {
			prepare(fullName, nationalID) {
				return {
					payload: {
						fullName,
						nationalID,
						createdOn: new Date().toISOString(),
					},
				};
			},
			reducer(state, action) {
				state.fullName = action.payload.fullName;
				state.nationalID = action.payload.nationalID;
				state.createdOn = action.payload.createdOn;
			},
		},
		updateName(state, action) {
			state.fullName = action.payload;
		},
	},
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case "customer/createCustomer":
// 			return {
// 				...state,
// 				fullName: action.payload.fullName,
// 				nationalID: action.payload.nationalID,
// 				createdOn: action.payload.createdOn,
// 			};
// 		case "customer/updateName":
// 			return { ...state, fullName: action.payload };
// 		default:
// 			return state;
// 	}
// }

// export function createCustomer(fullName, nationalID) {
// 	return {
// 		type: "customer/createCustomer",
// 		payload: { fullName, nationalID, createdOn: new Date().toISOString() },
// 	};
// }

// export function updateName(updatedFullName) {
// 	return { type: "customer/updateName", payload: updatedFullName };
// }
