import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AdminState {
	isAdmin: boolean;
	adminChanged: boolean;
}

const initialState: AdminState = {
	isAdmin: false,
	adminChanged: false,
};

export const adminSlice = createSlice({
	name: "isAdmin",
	initialState,
	reducers: {
		setAdmin: (state, action: PayloadAction<boolean>) => {
			console.log("admin changed to " + action.payload);
			state.isAdmin = action.payload;
		},
		setAdminChanged: (state) => {
			state.adminChanged = true;
		},
		resetAdminChanged: (state) => {
			state.adminChanged = false;
		},
	},
});

export const {
	setAdmin,
	setAdminChanged,
	resetAdminChanged,
} = adminSlice.actions;

export const selectIsAdmin = (state: RootState) => state.isAdmin.isAdmin;
export const selectAdminChanged = (state: RootState) =>
	state.isAdmin.adminChanged;

export default adminSlice.reducer;
