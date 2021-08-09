import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { changeLoading } from "../loading";
import { getTodaysTasks } from "./dashboardAPI";

export type TaskType = {
	taskName: string;
	taskDesc: string;
	assignee: string;
	assignor: string;
	status: "pending" | "completed" | "inprogress" | "overdue" | "assigned";
	dueDate: string;
	completedAt: string;
	id: number;
	created_at: string;
	assignorName: string;
};

export interface DashboardState {
	todaysTasks: {
		total: number;
		all: TaskType[];
		overdue: TaskType[];
		inProgress: TaskType[];
		assigned: TaskType[];
		completed: TaskType[];
	} | null;
}

const initialState: DashboardState = {
	todaysTasks: null,
};

export const DashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setTodaysTasks: (
			state,
			action: PayloadAction<DashboardState["todaysTasks"]>
		) => {
			state.todaysTasks = action.payload;
		},
	},
});

export const { setTodaysTasks } = DashboardSlice.actions;

export const getTodaysTasksSuccess = (response: any): AppThunk => (
	dispatch
) => {
	dispatch(changeLoading("passed"));
	dispatch(setTodaysTasks(response.data.tasks));
};

export const getTodaysTasksFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const getTodaysTasksInit = (): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await getTodaysTasks();
		dispatch(getTodaysTasksSuccess(response));
	} catch (error) {
		dispatch(getTodaysTasksFailed(error));
	}
};

export const selectTodaysTasks = (state: RootState) =>
	state.dashboard.todaysTasks;

export default DashboardSlice.reducer;
