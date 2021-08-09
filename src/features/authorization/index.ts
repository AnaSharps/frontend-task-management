import { AppThunk } from "../../app/store";
import { changeLoading } from "../loading";
import { checkAdmin, checkLoggedIn } from "./authorizationAPI";
import {} from "react-router";
import { getUsersInit } from "../users";
import { resetLoginChanged, setCurrUser } from "../login";
import { resetAdminChanged, setAdmin, setAdminChanged } from "../isAdmin";

// export type AUTHSUCCESS = {
// 	type: string;
// 	payload:
// };

export const authorizationSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(setCurrUser(response.data.user));
	dispatch(getUsersInit());
	dispatch(resetAdminChanged());
	dispatch(resetLoginChanged());
};

export const authorizationFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	dispatch(resetLoginChanged());
	// dispatch(setError(error));
};

export const authorizationInit = (): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await checkLoggedIn();
		dispatch(authorizationSuccess(response));

		// if (response) {
		// 	try {
		// 		const res = await checkAdmin(url);
		// 	} catch (error) {
		// 		dispatch(authorizationFailed(error));
		// 	}
		// }
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
	dispatch(setAdminChanged());
	// dispatch(resetLoginChanged());
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
