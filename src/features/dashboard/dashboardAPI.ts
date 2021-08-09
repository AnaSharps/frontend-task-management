import axios from "axios";
import { host } from "../../app/constants";

export function getTodaysTasks() {
	return axios.get(`${host}/api/todaysTasks`, { withCredentials: true });
}

export function getMyStats() {
	return axios.get(`${host}/api/myStats`, { withCredentials: true });
}
