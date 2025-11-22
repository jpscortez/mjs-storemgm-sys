import {OpenDebtDTO} from "@/Models/OpenDebtDTO";
import {OpenDebtSummaryDTO} from "@/Models/OpenDebtSummaryDTO";
import {PaymentMethodType} from "@/Models/PaymentMethod";
import axios from "axios";

export async function getOpenDebtsSummary() {
	return axios
		.get<OpenDebtSummaryDTO[]>(`${import.meta.env.VITE_BACKEND_API}/open-debts`)
		.then((response) => response.data);
}

export async function getOpenDebtByCode(code: number) {
	return axios
		.get<OpenDebtDTO>(`${import.meta.env.VITE_BACKEND_API}/open-debts/${code}`)
		.then((response) => response.data);
}

type SettleOpenDebtRequest = {
	code: number;
	paymentMethod: PaymentMethodType;
};

export async function settleOpenDebtByCodeAndType({code, paymentMethod}: SettleOpenDebtRequest) {
	await axios.post(`${import.meta.env.VITE_BACKEND_API}/open-debts/settle/${code}`, {paymentMethod});
}
