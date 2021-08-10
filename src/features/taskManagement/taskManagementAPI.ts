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
	console.log(task);
	return axios.post(
		`${host}/api/createTask`,
		{
			...task,
		},
		{ withCredentials: true }
	);
}
