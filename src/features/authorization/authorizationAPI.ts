import axios from "axios";
import { host } from "../../app/constants";

export function checkLoggedIn() {
	return axios.get(`${host}/api`, { withCredentials: true });
}

export function checkAdmin() {
	return axios.get(`${host}/admin`, { withCredentials: true });
}
