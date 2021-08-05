import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface VerifyState {
	verifyAgain: boolean;
	sentPassLink: boolean;
}

const initialState: VerifyState = {
	verifyAgain: false,
	sentPassLink: false,
};

export const verifyEmailSlice = createSlice({
	name: "verifyEmail",
	initialState,
	reducers: {
		sendVerify: (state) => {
			state.verifyAgain = true;
		},
		sendPassLink: (state) => {
			state.sentPassLink = true;
		},
	},
});

export const { sendVerify, sendPassLink } = verifyEmailSlice.actions;

export const selectVerifySent = (state: RootState) =>
	state.verifyEmail.verifyAgain;
export const selectPassLink = (state: RootState) =>
	state.verifyEmail.sentPassLink;

export default verifyEmailSlice.reducer;
