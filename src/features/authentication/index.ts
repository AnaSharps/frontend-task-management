import { AppThunk } from "../../app/store";
import { changeLoading } from "../loading";
import { checkLoggedIn } from "./authorizationAPI";

export const authorizationSuccess = (response: any): AppThunk => (dispatch) => {
	// dispatch(redirect(response.url));
	dispatch(changeLoading("passed"));
};

export const authorizationFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const authorizationInit = (url: string): AppThunk => async (
	dispatch
) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await checkLoggedIn(url);
		dispatch(authorizationSuccess(response));
	} catch (error) {
		dispatch(authorizationFailed(error));
	}
};
