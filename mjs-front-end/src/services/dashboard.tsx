import {OpenAccountDTO} from "@/Models/OpenAccountDTO";
import {SalesByPaymentMethodDTO} from "@/Models/SalesByPaymentMethod";
import axios from "axios";

export async function getOpenAccounts(): Promise<OpenAccountDTO[]> {
	const openAccounts = axios
		.get<OpenAccountDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/open-accounts`)
		.then((response) => response.data);

	return openAccounts;
}

export async function getSalesByPaymentMethod(): Promise<SalesByPaymentMethodDTO[]> {
	const openAccounts = axios
		.get<SalesByPaymentMethodDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/sales-by-payment-method`)
		.then((response) => response.data);

	return openAccounts;
}
