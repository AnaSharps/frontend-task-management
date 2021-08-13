import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { changeLoading } from "../loading";
import { getMyStats, getTodaysTasks } from "./dashboardAPI";

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
	myStats: {
		total: number;
		noActivity: number;
		inProgress: number;
		overdue: number;
		completedOnTime: number;
		completedAfterDeadline: number;
	} | null;
}

const initialState: DashboardState = {
	todaysTasks: null,
	myStats: null,
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
		setMyStats: (state, action: PayloadAction<DashboardState["myStats"]>) => {
			state.myStats = action.payload;
		},
	},
});

export const { setTodaysTasks, setMyStats } = DashboardSlice.actions;

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
export const getMyStatsSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	// console.log(response.data.stats);
	dispatch(setMyStats(response.data.stats));
};

export const getMyStatsFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const getMyStatsInit = (): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await getMyStats();
		dispatch(getMyStatsSuccess(response));
	} catch (error) {
		dispatch(getMyStatsFailed(error));
	}
};

export const selectTodaysTasks = (state: RootState) =>
	state.dashboard.todaysTasks;
export const selectMyStats = (state: RootState) => state.dashboard.myStats;

export default DashboardSlice.reducer;
