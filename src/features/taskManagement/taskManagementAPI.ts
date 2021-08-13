import axios from "axios";
import { host } from "../../app/constants";

export function getTasks(credentials: {
	searchKeywords: string;
	searchAssignee: string;
	searchAssignor: string;
	searchDueDate: string;
	display: number;
	ofset: number;
}) {
	return axios.post(
		`${host}/api/getTasks`,
		{ ...credentials },
		{ withCredentials: true }
	);
}

export function createTask(task: {
	name: string;
	desc: string;
	dueDate: string;
	assignee: string;
}) {
	return axios.post(
		`${host}/api/createTask`,
		{
			...task,
		},
		{ withCredentials: true }
	);
}

export function getTaskStats(assignee: string) {
	return axios.post(
		`${host}/api/taskStats`,
		{
			assignee,
		},
		{ withCredentials: true }
	);
}

export function getTodaysStats(assignee: string) {
	return axios.post(
		`${host}/api/todaysStats`,
		{
			assignee,
		},
		{ withCredentials: true }
	);
}

export function setTaskStat(
	id: number,
	status: "pending" | "inprogress" | "completed"
) {
	return axios.put(
		`${host}/api/updateTaskStatus`,
		{
			id,
			status,
		},
		{ withCredentials: true }
	);
}
