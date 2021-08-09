import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { AppThunk, RootState } from "../../app/store";
import { changeLoading } from "../loading";
import { getUsers } from "./UsersAPI";

export type User = {
	name: string;
	email: string;
	createdBy: string;
	deletedBy: string;
	role: "ADMIN" | "NORMAL";
};

export interface UserListState {
	users: User[];
	display: number;
	ofset: number;
	search: string;
	totalCount: number;
}

const initialState: UserListState = {
	users: [],
	display: 6,
	ofset: 0,
	search: "",
	totalCount: 0,
};

export const getUsersSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	dispatch(setUsers(response.data.users));
	dispatch(setTotalCount(response.data.totalCount));
};

export const getUsersFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const getUsersInit = (): AppThunk => async (dispatch, getState) => {
	const search = selectSearch(getState());
	const display = selectDisplayNum(getState());
	const ofset = selectOffset(getState());
	const deleted = false;
	dispatch(changeLoading("processing"));
	const credentials = { search, display, ofset, deleted };
	try {
		const response = await getUsers({ ...credentials });
		dispatch(getUsersSuccess(response));
	} catch (error) {
		dispatch(getUsersFailed(error));
	}
};

export const userListSlice = createSlice({
	name: "userList",
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
		},
		setDisplay: (state, action: PayloadAction<number>) => {
			state.display = action.payload;
		},
		setOffset: (state, action: PayloadAction<number>) => {
			state.ofset = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setTotalCount: (state, action: PayloadAction<number>) => {
			state.totalCount = action.payload;
		},
	},
});

export const {
	setUsers,
	setDisplay,
	setOffset,
	setSearch,
	setTotalCount,
} = userListSlice.actions;

export const selectUserList = (state: RootState) => state.userList.users;
export const selectDisplayNum = (state: RootState) => state.userList.display;
export const selectOffset = (state: RootState) => state.userList.ofset;
export const selectSearch = (state: RootState) => state.userList.search;
export const selectTotalCount = (state: RootState) => state.userList.totalCount;

export default userListSlice.reducer;
