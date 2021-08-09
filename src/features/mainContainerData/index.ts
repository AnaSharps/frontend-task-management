import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { changeLoading } from "../loading";

export interface MainContainerData {
	title: string;
	search: boolean;
	backstring?: string;
}

const initialState: MainContainerData = {
	title: "",
	search: false,
	backstring: "",
};

export const mainContDataSlice = createSlice({
	name: "mainContData",
	initialState,
	reducers: {
		setMainContainerData: (state, action: PayloadAction<MainContainerData>) => {
			state.title = action.payload.title;
			state.search = action.payload.search;
			state.backstring = action.payload.backstring;
		},
	},
});

export const { setMainContainerData } = mainContDataSlice.actions;

export const selectMainContData = (state: RootState) => state.mainContData;

export default mainContDataSlice.reducer;
