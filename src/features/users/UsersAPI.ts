import axios from "axios";
import { host } from "../../app/constants";

export function getUsers(credentials: {
	search: string;
	display: number;
	ofset: number;
	deleted: boolean;
}) {
	return axios.post(
		`${host}/api/allUsers`,
		{
			...credentials,
		},
		{ withCredentials: true }
	);
}
