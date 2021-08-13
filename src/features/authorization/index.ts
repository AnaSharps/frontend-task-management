import { AppThunk } from "../../app/store";
import { changeLoading } from "../loading";
import { checkAdmin, checkLoggedIn } from "./authorizationAPI";
import {} from "react-router";
import { getUsersInit } from "../users";
import {
	resetLoginChanged,
	resetUser,
	setCurrUser,
	setLoginStatus,
} from "../login";
import { resetAdminChanged, setAdmin, setAdminChanged } from "../isAdmin";

export const authorizationSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(setCurrUser(response.data.user));
	dispatch(getUsersInit());
};

export const authorizationFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(resetUser());
	// dispatch(setError(error));
};

export const authorizationInit = (): AppThunk => async (dispatch) => {
	dispatch(setLoginStatus("processing"));
	try {
		const response = await checkLoggedIn();
		dispatch(authorizationSuccess(response));
	} catch (error) {
		dispatch(authorizationFailed(error));
	}
};

export const adminAuthSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(setCurrUser(response.data.user));
	dispatch(getUsersInit());
	dispatch(resetAdminChanged());
	dispatch(resetLoginChanged());
};

export const adminAuthFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	dispatch(setAdmin(false));
	// dispatch(setError(error));
};

export const adminAuthInit = (): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await checkAdmin();
		dispatch(adminAuthSuccess(response));
	} catch (error) {
		dispatch(adminAuthFailed(error));
	}
};
