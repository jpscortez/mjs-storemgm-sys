import {OpenAccountDTO} from "@/Models/OpenAccountDTO";
import axios from "axios";

export async function getOpenAccountByCode(code: number) {
	return axios
		.get<OpenAccountDTO>(`${import.meta.env.VITE_BACKEND_API}/open-accounts/${code}`)
		.then((response) => response.data);
}

export async function settleOpenAccountByCode(code: number) {
	await axios.post(`${import.meta.env.VITE_BACKEND_API}/open-accounts/settle/${code}`);
}
