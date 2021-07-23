import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AdminState {
	isAdmin: boolean;
}

const initialState: AdminState = {
	isAdmin: false,
};

export const adminSlice = createSlice({
	name: "isAdmin",
	initialState,
	reducers: {
		setAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload;
		},
	},
});

export const { setAdmin } = adminSlice.actions;

export const selectIsAdmin = (state: RootState) => state.isAdmin.isAdmin;

export default adminSlice.reducer;
