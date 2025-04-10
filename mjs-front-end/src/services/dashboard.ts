import {OpenAccountDashboardDTO} from "@/Models/OpenAccountDashboardDTO";
import {SalesByPaymentMethodDTO} from "@/Models/SalesByPaymentMethod";
import {SalesByStatusDTO} from "@/Models/SalesByStatusDTO";
import axios from "axios";

export async function getDashboardOpenAccounts(): Promise<OpenAccountDashboardDTO[]> {
	const openAccounts = axios
		.get<OpenAccountDashboardDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/open-accounts`)
		.then((response) => response.data);

	return openAccounts;
}

export async function getDashboardSalesByPaymentMethod(): Promise<SalesByPaymentMethodDTO[]> {
	const openAccounts = axios
		.get<SalesByPaymentMethodDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/sales-by-payment-method`)
		.then((response) => response.data);

	return openAccounts;
}

export async function getDashboardSalesByStatus(): Promise<SalesByStatusDTO[]> {
	const salesByStatus = axios
		.get<SalesByStatusDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/sales-by-status-for-month`)
		.then((response) => response.data);

	return salesByStatus;
}
