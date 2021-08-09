import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { AppThunk, RootState } from "../../app/store";
import { changeLoading } from "../loading";

export interface MainContainerData {
	title: string;
	search: boolean;
	backstring?: string;
	addButton?: Function | false;
	addButtonText?: string | false;
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
			state.addButton = action.payload.addButton;
			state.addButtonText = action.payload.addButtonText;
		},
	},
});

export const { setMainContainerData } = mainContDataSlice.actions;

export const selectMainContData = (state: RootState) => state.mainContData;

export default mainContDataSlice.reducer;
