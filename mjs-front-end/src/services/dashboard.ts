import {OpenDebtDashboardDTO} from "@/Models/OpenDebtDashboardDTO";
import {SalesByPaymentMethodDTO} from "@/Models/SalesByPaymentMethod";
import {SalesByStatusDTO} from "@/Models/SalesByStatusDTO";
import axios from "axios";

export async function getDashboardOpenDebts(): Promise<OpenDebtDashboardDTO[]> {
	const openDebts = axios
		.get<OpenDebtDashboardDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/open-debts`)
		.then((response) => response.data);

	return openDebts;
}

export async function getDashboardSalesByPaymentMethod(): Promise<SalesByPaymentMethodDTO[]> {
	const sales = axios
		.get<SalesByPaymentMethodDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/sales-by-payment-method`)
		.then((response) => response.data);

	return sales;
}

export async function getDashboardSalesByStatus(): Promise<SalesByStatusDTO[]> {
	const salesByStatus = axios
		.get<SalesByStatusDTO[]>(`${import.meta.env.VITE_BACKEND_API}/dashboard/sales-by-status-for-month`)
		.then((response) => response.data);

	return salesByStatus;
}
