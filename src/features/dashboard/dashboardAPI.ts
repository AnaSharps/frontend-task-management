import axios from "axios";
import { host } from "../../app/constants";

export function getTodaysTasks() {
	return axios.get(`${host}/api/todaysTasks`, { withCredentials: true });
}
