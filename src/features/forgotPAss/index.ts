import { AppThunk } from "../../app/store";
import { authorizationInit } from "../authorization";
import { changeLoading } from "../loading";
import { forgetPass, resetPass, changePass } from "./forgotPassAPI";

export const forgotPassSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
};

export const forgotPassFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const forgotPassInit = (credentials: {
	email: string;
}): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await forgetPass({ ...credentials });
		dispatch(forgotPassSuccess(response));
	} catch (error) {
		dispatch(forgotPassFailed(error));
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const resetPassSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
};

export const resetPassFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const resetPassInit = (
	token: string,
	newPass: string
): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await resetPass(token, newPass);
		dispatch(resetPassSuccess(response));
	} catch (error) {
		dispatch(resetPassFailed(error));
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const changePassSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
};

export const changePassFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const changePassInit = (
	oldPass: string,
	newPass: string
): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await changePass(oldPass, newPass);
		dispatch(changePassSuccess(response));
	} catch (error) {
		dispatch(changePassFailed(error));
	}
};
