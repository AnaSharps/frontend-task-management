import axios from "axios";
import { host } from "../../app/constants";

export function checkLoggedIn(url: string) {
	return axios.post(
		`${host}/api`,
		{
			url,
		},
		{ withCredentials: true }
	);
}

export function checkAdmin(url: string) {
	return axios.post(
		`${host}/admin`,
		{
			url,
		},
		{ withCredentials: true }
	);
}
