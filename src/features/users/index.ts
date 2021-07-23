import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type User = {
	id: number;
	email: string;
	createdBy: string;
	deletedBy: string;
	role: "ADMIN" | "NORMAL";
};

export interface UserListState {
	users: User[] | null;
	display: number;
	ofset: number;
	search: string | null;
}

const initialState: UserListState = {
	users: null,
	display: 10,
	ofset: 0,
	search: null,
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
	},
});

export const {
	setUsers,
	setDisplay,
	setOffset,
	setSearch,
} = userListSlice.actions;

export const selectUserList = (state: RootState) => state.userList.users;
export const selectDisplayNum = (state: RootState) => state.userList.display;
export const selectOffset = (state: RootState) => state.userList.ofset;
export const selectSearch = (state: RootState) => state.userList.search;

export default userListSlice.reducer;
