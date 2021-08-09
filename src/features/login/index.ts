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
}

const initialState: LoginState = {
	loginChanged: false,
	currUser: null,
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
			state.currUser = null;
		},
		setCurrUser: (state, action: PayloadAction<User>) => {
			state.currUser = action.payload;
		},
	},
});

export const {
	setLoginChanged,
	resetLoginChanged,
	resetUser,
	setCurrUser,
} = LoginStateSlice.actions;

export const loginSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	if (response.data.admin) {
		dispatch(setAdmin(true));
	} else {
		dispatch(setAdmin(false));
	}
	dispatch(setAdminChanged());
	dispatch(setLoginChanged());
	dispatch(setCurrUser(response.data.user));
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
	dispatch(setLoginChanged());
	dispatch(resetUser());
	// dispatch(authorizationInit());
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

export const selectLoginChanged = (state: RootState) =>
	state.login.loginChanged;
export const selectCurrUser = (state: RootState) => state.login.currUser;

export default LoginStateSlice.reducer;
