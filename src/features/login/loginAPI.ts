import axios from "axios";
import { host } from "../../app/constants";

export function loginWithCredentials(credentials: {
	email: string;
	pass: string;
}) {
	return axios.post(
		`${host}/login`,
		{
			email: credentials.email,
			password: credentials.pass,
		},
		{ withCredentials: true }
	);
}

export function logout() {
	return axios.get(`${host}/api/logout`, { withCredentials: true });
}
