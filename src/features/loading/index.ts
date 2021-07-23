import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Status = "passed" | "failed" | "processing" | "idle";

export interface LoadingState {
	status: Status;
}

const initialState: LoadingState = {
	status: "idle",
};

export const statusSlice = createSlice({
	name: "status",
	initialState,
	reducers: {
		changeLoading: (state, action: PayloadAction<Status>) => {
			state.status = action.payload;
		},
	},
});

export const { changeLoading } = statusSlice.actions;

export const selectStatus = (state: RootState) => state.status.status;

export default statusSlice.reducer;
