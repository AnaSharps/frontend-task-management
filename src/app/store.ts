import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import signupReducer from "../features/signupForm";
import verifyEmailReducer from "../features/verifyEmailSent";
import loadingReducer from "../features/loading";
import userListReducer from "../features/users";
import tokenReducer from "../features/token";
import isAdminReducer from "../features/isAdmin";
import loginStateReducer from "../features/login";
import mainContainerReducer from "../features/mainContainerData";
import dashboardReducer from "../features/dashboard";
import taskManagementReducer from "../features/taskManagement";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		signup: signupReducer,
		verifyEmail: verifyEmailReducer,
		status: loadingReducer,
		userList: userListReducer,
		token: tokenReducer,
		isAdmin: isAdminReducer,
		login: loginStateReducer,
		mainContData: mainContainerReducer,
		dashboard: dashboardReducer,
		tasks: taskManagementReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
