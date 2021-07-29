import axios from "axios";
import { host } from "../../app/constants";

export function forgetPass(credentials: { email: string }) {
	return axios.post(
		`${host}/forgotPass`,
		{
			email: credentials.email,
		},
		{ withCredentials: true }
	);
}
export function resetPass(token: string, newPass: string) {
	return axios.post(
		`${host}/resetPass`,
		{
			token,
			password: newPass,
		},
		{ withCredentials: true }
	);
}
export function changePass(oldPass: string, newPass: string) {
	return axios.post(
		`${host}/api/changePassword`,
		{
			password: oldPass,
			newPassword: newPass,
		},
		{ withCredentials: true }
	);
}
