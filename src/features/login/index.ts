import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { adminAuthInit, authorizationInit } from "../authorization";
import { setAdmin, setAdminChanged } from "../isAdmin";
import { changeLoading } from "../loading";
import { loginWithCredentials, logout } from "./loginAPI";

export interface LoginState {
	loginChanged: boolean;
}

const initialState: LoginState = {
	loginChanged: false,
};

export const LoginStateSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setLoginChanged: (state) => {
			console.log("set true");
			state.loginChanged = true;
		},
		resetLoginChanged: (state) => {
			console.log("set false");
			state.loginChanged = false;
		},
	},
});

export const { setLoginChanged, resetLoginChanged } = LoginStateSlice.actions;

export const loginSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	if (response.data.admin) {
		dispatch(setAdmin(true));
	} else {
		dispatch(setAdmin(false));
	}
	dispatch(setAdminChanged());
	dispatch(setLoginChanged());
};

export const loginFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const loginInit = (credentials: {
	email: string;
	pass: string;
}): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await loginWithCredentials({ ...credentials });
		dispatch(loginSuccess(response));
	} catch (error) {
		dispatch(loginFailed(error));
	}
};

export const logoutSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	dispatch(setLoginChanged());
	// dispatch(authorizationInit());
};

export const logoutFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const logoutInit = (): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await logout();
		dispatch(logoutSuccess(response));
	} catch (error) {
		dispatch(logoutFailed(error));
	}
};

export const selectLoginChanged = (state: RootState) =>
	state.login.loginChanged;

export default LoginStateSlice.reducer;
