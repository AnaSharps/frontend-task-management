import { AppThunk } from "../../app/store";
import { changeLoading } from "../loading";
import { checkAdmin, checkLoggedIn } from "./authorizationAPI";
import {} from "react-router";
import { getUsersInit } from "../users";

// export type AUTHSUCCESS = {
// 	type: string;
// 	payload:
// };

export const authorizationSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(getUsersInit());
};

export const authorizationFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const authorizationInit = (
	// url: string,
	url2: string
): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await checkLoggedIn(url2);
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
