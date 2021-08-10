import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dateFormat } from "highcharts";
import { AppThunk, RootState } from "../../app/store";
import { TaskType } from "../dashboard";
import { changeLoading } from "../loading";
import { getTasks } from "./taskManagementAPI";

export interface TaskState {
	getTasks: {
		searchKeywords: string;
		searchAssignee: string;
		searchAssignor: string;
		searchDueDate: string;
		display: number;
		ofset: number;
	};
	allTasks: {
		assigned: TaskType[];
		inProgress: TaskType[];
		completed: TaskType[];
		overdue: TaskType[];
	} | null;
}

const initialState: TaskState = {
	getTasks: {
		searchKeywords: "",
		searchAssignee: "",
		searchAssignor: "",
		searchDueDate: "",
		display: 5,
		ofset: 0,
	},
	allTasks: null,
};

export const TaskManagementSlice = createSlice({
	name: "taskManagement",
	initialState,
	reducers: {
		setGetTasksKeywords: (state, action: PayloadAction<string>) => {
			state.getTasks.searchKeywords = action.payload;
		},
		setGetTasksAssignee: (state, action: PayloadAction<string>) => {
			state.getTasks.searchAssignee = action.payload;
		},
		setGetTasksAssignor: (state, action: PayloadAction<string>) => {
			state.getTasks.searchAssignor = action.payload;
		},
		setGetTasksDueDate: (state, action: PayloadAction<string>) => {
			state.getTasks.searchDueDate = action.payload;
		},
		setGetTasksDisplay: (state, action: PayloadAction<number>) => {
			state.getTasks.display = action.payload;
		},
		setGetTasksOffset: (state, action: PayloadAction<number>) => {
			state.getTasks.ofset = action.payload;
		},
		setAllTasks: (state, action: PayloadAction<TaskState["allTasks"]>) => {
			state.allTasks = action.payload;
		},
	},
});

export const {
	setGetTasksAssignee,
	setGetTasksAssignor,
	setGetTasksDisplay,
	setGetTasksDueDate,
	setGetTasksKeywords,
	setGetTasksOffset,
	setAllTasks,
} = TaskManagementSlice.actions;

export const getTasksSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	dispatch(setAllTasks(response.data.tasks));
};

export const getTasksFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const getTasksInit = (): AppThunk => async (dispatch, getState) => {
	dispatch(changeLoading("processing"));
	try {
		const searchKeywords = selectGetTasksKeyword(getState());
		const searchAssignee = selectGetTasksAssignee(getState());
		const searchAssignor = selectGetTasksAssignor(getState());
		const searchDueDate = selectGetTasksDueDate(getState());
		const display = selectGetTasksDisplay(getState());
		const ofset = selectGetTasksOffset(getState());
		const response = await getTasks({
			searchKeywords,
			searchAssignee,
			searchAssignor,
			searchDueDate,
			display,
			ofset,
		});
		dispatch(getTasksSuccess(response));
	} catch (error) {
		dispatch(getTasksFailed(error));
	}
};

// export const getMyStatsSuccess = (response: any): AppThunk => (dispatch) => {
// 	dispatch(changeLoading("passed"));
// 	dispatch(setMyStats(response.data.stats));
// };

// export const getMyStatsFailed = (error: any): AppThunk => (dispatch) => {
// 	dispatch(changeLoading("failed"));
// 	// dispatch(setError(error));
// };

// export const getMyStatsInit = (): AppThunk => async (dispatch) => {
// 	dispatch(changeLoading("processing"));
// 	try {
// 		const response = await getMyStats();
// 		dispatch(getMyStatsSuccess(response));
// 	} catch (error) {
// 		dispatch(getMyStatsFailed(error));
// 	}
// };

export const selectGetTasksDisplay = (state: RootState) =>
	state.tasks.getTasks.display;
export const selectGetTasksKeyword = (state: RootState) =>
	state.tasks.getTasks.searchKeywords;
export const selectGetTasksAssignee = (state: RootState) =>
	state.tasks.getTasks.searchAssignee;
export const selectGetTasksAssignor = (state: RootState) =>
	state.tasks.getTasks.searchAssignor;
export const selectGetTasksOffset = (state: RootState) =>
	state.tasks.getTasks.ofset;
export const selectGetTasksDueDate = (state: RootState) =>
	state.tasks.getTasks.searchDueDate;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;

export default TaskManagementSlice.reducer;
