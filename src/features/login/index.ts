import { AppThunk } from "../../app/store";
import { changeLoading } from "../loading";
import { loginWithCredentials } from "./loginAPI";

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
