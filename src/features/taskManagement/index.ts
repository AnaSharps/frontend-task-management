import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dateFormat from "dateformat";
import { AppThunk, RootState } from "../../app/store";
import { getTodaysTasksInit, TaskType } from "../dashboard";
import { changeLoading } from "../loading";
import {
	createTask,
	getTasks,
	getTaskStats,
	getTodaysStats,
	setTaskStat,
} from "./taskManagementAPI";

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
	taskStats:
		| null
		| {
				date: string;
				completedOnTime: number;
				completedAfterDeadline: number;
				overdue: number;
				allDue: number;
		  }[];
	todaysStats: {
		total: number;
		noActivity: number;
		inProgress: number;
		overdue: number;
		completedOnTime: number;
		completedAfterDeadline: number;
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
	taskStats: null,
	todaysStats: null,
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
		setTaskStats: (state, action: PayloadAction<TaskState["taskStats"]>) => {
			state.taskStats = action.payload;
		},
		setTodaysStats: (
			state,
			action: PayloadAction<TaskState["todaysStats"]>
		) => {
			state.todaysStats = action.payload;
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
	setTaskStats,
	setTodaysStats,
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getTaskStatsSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	// console.log(response.data);
	dispatch(setTaskStats(response.data.stats));
};

export const getTaskStatsFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const getTaskStatsInit = (assignee: string): AppThunk => async (
	dispatch,
	getState
) => {
	dispatch(changeLoading("processing"));
	dispatch(setTaskStats(null));
	try {
		// console.log("hello");
		const response = await getTaskStats(assignee);
		dispatch(getTaskStatsSuccess(response));
	} catch (error) {
		dispatch(getTaskStatsFailed(error));
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const setTaskStatusSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	console.log(response.data);
	dispatch(getTasksInit());
	dispatch(getTodaysTasksInit());
};

export const setTaskStatusFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const setTaskStatusInit = (
	id: number,
	status: "inprogress" | "pending" | "completed"
): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		console.log("hello");
		const response = await setTaskStat(id, status);
		dispatch(setTaskStatusSuccess(response));
	} catch (error) {
		dispatch(setTaskStatusFailed(error));
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getTodaysStatsSuccess = (response: any): AppThunk => (
	dispatch
) => {
	dispatch(changeLoading("passed"));
	dispatch(setTodaysStats(response.data.stats));
};

export const getTodaysStatsFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const getTodaysStatsInit = (assignee: string): AppThunk => async (
	dispatch,
	getState
) => {
	dispatch(changeLoading("processing"));
	try {
		const response = await getTodaysStats(assignee);
		dispatch(getTodaysStatsSuccess(response));
	} catch (error) {
		dispatch(getTodaysStatsFailed(error));
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const addNewTaskSuccess = (response: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("passed"));
	dispatch(getTasksInit());
};

export const addNewTaskFailed = (error: any): AppThunk => (dispatch) => {
	dispatch(changeLoading("failed"));
	// dispatch(setError(error));
};

export const addNewTaskInit = (task: {
	name: string;
	desc: string;
	dueDate: string;
	assignee: string;
}): AppThunk => async (dispatch) => {
	dispatch(changeLoading("processing"));
	try {
		const date = dateFormat(task.dueDate, "yyyy-mm-dd HH:MM:ss");
		// console.log(date);
		// console.log(task.dueDate);
		const response = await createTask({ ...task, dueDate: date });
		dispatch(addNewTaskSuccess(response));
	} catch (error) {
		dispatch(addNewTaskFailed(error));
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const searchAssignee = (email: string): AppThunk => (
	dispatch,
	getState
) => {
	dispatch(setGetTasksAssignee(email));
	dispatch(getTasksInit());
};

export const searchAssignor = (email: string): AppThunk => (
	dispatch,
	getState
) => {
	dispatch(setGetTasksAssignor(email));
	dispatch(getTasksInit());
};

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
export const selectTaskStats = (state: RootState) => state.tasks.taskStats;
export const selectTodaysStats = (state: RootState) => state.tasks.todaysStats;

export default TaskManagementSlice.reducer;
