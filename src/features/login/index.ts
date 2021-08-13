import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { adminAuthInit, authorizationInit } from "../authorization";
import { setAdmin, setAdminChanged } from "../isAdmin";
import { changeLoading } from "../loading";
import { User } from "../users";
import { loginWithCredentials, logout } from "./loginAPI";

export interface LoginState {
	loginChanged: boolean;
	currUser: User | null;
	status: "processing" | "passed";
}

const initialState: LoginState = {
	loginChanged: false,
	currUser: null,
	status: "passed",
};

export const LoginStateSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setLoginChanged: (state) => {
			state.loginChanged = true;
		},
		resetLoginChanged: (state) => {
			state.loginChanged = false;
		},
		resetUser: (state) => {
			// console.log("user changed?");
			state.currUser = null;
			state.status = "passed";
		},
		setCurrUser: (state, action: PayloadAction<LoginState["currUser"]>) => {
			state.currUser = action.payload;
			state.status = "passed";
		},
		setLoginStatus: (state, action: PayloadAction<LoginState["status"]>) => {
			state.status = action.payload;
		},
	},
});

export const {
	setLoginChanged,
	resetLoginChanged,
	resetUser,
	setCurrUser,
	setLoginStatus,
} = LoginStateSlice.actions;

export const loginSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	dispatch(setCurrUser(response.data.user));
};

export const loginFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(resetUser());
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const loginInit = (credentials: {
	email: string;
	pass: string;
}): AppThunk => async (dispatch) => {
	dispatch(setLoginStatus("processing"));
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
	dispatch(resetUser());
	// dispatch(authorizationInit());
};

export const logoutFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(setLoginStatus("passed"));
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const logoutInit = (): AppThunk => async (dispatch) => {
	dispatch(setLoginStatus("processing"));
	try {
		const response = await logout();
		dispatch(logoutSuccess(response));
	} catch (error) {
		dispatch(logoutFailed(error));
	}
};

export const selectLoginChanged = (state: RootState) =>
	state.login.loginChanged;
export const selectCurrUser = (state: RootState) => state.login.currUser;
export const selectLoginStatus = (state: RootState) => state.login.status;

export default LoginStateSlice.reducer;
