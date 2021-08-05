import { AppThunk } from "../../app/store";
import { adminAuthInit } from "../authorization";
import { changeLoading } from "../loading";
import { sendVerify } from "../verifyEmailSent";
import { deleteUser } from "./deregistrationAPIs";

export const deleteUserSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(adminAuthInit());
	dispatch(changeLoading("passed"));
};

export const deleteUserFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const deleteUserInit = (email: string): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await deleteUser(email);
		dispatch(deleteUserSuccess(response));
	} catch (error) {
		dispatch(deleteUserFailed(error));
	}
};
