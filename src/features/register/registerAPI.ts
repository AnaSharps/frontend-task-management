import axios from "axios";
import { host } from "../../app/constants";

export function registerSelf(email: string) {
	return axios.post(`${host}/register`, {
		email,
	});
}
