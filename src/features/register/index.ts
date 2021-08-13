import { AppThunk } from "../../app/store";
import { changeLoading } from "../loading";
import { setCurrUser } from "../login";
import { sendVerify } from "../verifyEmailSent";
import { addUser, registerSelf, signUser } from "./registerAPI";

export const registrationSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(sendVerify());
	dispatch(changeLoading("passed"));
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const registrationFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const registrationInit = (email: string): AppThunk => async (
	dispatch
) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await registerSelf(email);
		dispatch(registrationSuccess(response));
	} catch (error) {
		dispatch(registrationFailed(error));
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const addUserSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(sendVerify());
	dispatch(changeLoading("passed"));
};

export const addUserFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const addUserInit = (email: string): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await addUser(email);
		dispatch(addUserSuccess(response));
	} catch (error) {
		dispatch(addUserFailed(error));
	}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const signupUserSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	dispatch(setCurrUser(response.data.user));
};

export const signupUserFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const signupUserInit = (credentials: {
	username: string;
	password: string;
	token: string;
}): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await signUser(credentials);
		dispatch(signupUserSuccess(response));
	} catch (error) {
		dispatch(signupUserFailed(error));
	}
};
