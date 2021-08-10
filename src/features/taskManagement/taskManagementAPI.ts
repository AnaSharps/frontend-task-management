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

export function getMyStats() {
	return axios.get(`${host}/api/myStats`, { withCredentials: true });
}
