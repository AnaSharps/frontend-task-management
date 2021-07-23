import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SignUpState {
	showSignup: boolean;
}

const initialState: SignUpState = {
	showSignup: false,
};

export const signupSlice = createSlice({
	name: "signup",
	initialState,
	reducers: {
		changeSignup: (state) => {
			state.showSignup = !state.showSignup;
		},
		setSignup: (state, action: PayloadAction<boolean>) => {
			state.showSignup = action.payload;
		},
	},
});

export const { changeSignup, setSignup } = signupSlice.actions;

export const selectSignup = (state: RootState) => state.signup.showSignup;

export default signupSlice.reducer;
