import axios from "axios";
import { host } from "../../app/constants";

export function deleteUser(email: string) {
	return axios.post(
		`${host}/admin/deleteUser`,
		{
			email,
		},
		{
			withCredentials: true,
		}
	);
}
