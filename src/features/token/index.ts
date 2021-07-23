import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TokenState {
	token: string | null;
}

const initialState: TokenState = {
	token: window.localStorage.getItem("token"),
};

export const tokenStateSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
		},
	},
});

export const { setToken } = tokenStateSlice.actions;

export const selectToken = (state: RootState) => state.token.token;

export default tokenStateSlice.reducer;
