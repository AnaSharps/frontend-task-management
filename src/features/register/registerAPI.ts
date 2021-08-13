import axios from "axios";
import { host } from "../../app/constants";

export function registerSelf(email: string) {
	return axios.post(`${host}/register`, {
		email,
	});
}

export function addUser(email: string) {
	return axios.post(
		`${host}/admin/addUser`,
		{
			email,
		},
		{
			withCredentials: true,
		}
	);
}

export function signUser(credentials: {
	username: string;
	password: string;
	token: string;
}) {
	return axios.post(
		`${host}/register/signup`,
		{
			...credentials,
		},
		{
			withCredentials: true,
		}
	);
}
