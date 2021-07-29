import { AppThunk } from "../../app/store";
import { authorizationInit } from "../authorization";
import { changeLoading } from "../loading";
import { loginWithCredentials, logout } from "./loginAPI";

export const loginSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
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
	// dispatch(authorizationInit("/admin/loggedin", "/home/loggedin"));
	dispatch(authorizationInit("home/loggedin"));
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
