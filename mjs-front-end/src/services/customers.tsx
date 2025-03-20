import {CustomerDetailDTO} from "@/Models/CustomerDetailDTO";
import {CustomerSummaryDTO} from "@/Models/CustomerSummaryDTO";
import axios from "axios";

export async function getCustomerByCode(code: number): Promise<CustomerDetailDTO> {
	const customer = axios
		.get<CustomerDetailDTO>(`${import.meta.env.VITE_BACKEND_API}/customers/${code}`)
		.then((response) => response.data);

	return customer;
}

type PatchCustomerComplementsRequest = {
	code: number;
	phoneNumber?: string;
	address?: string;
	identification?: string;
};

export async function patchCustomerComplements({
	code,
	phoneNumber,
	address,
	identification,
}: PatchCustomerComplementsRequest): Promise<void> {
	axios
		.patch(`${import.meta.env.VITE_BACKEND_API}/customers/${code}`, {
			...(phoneNumber && {phoneNumber}),
			...(address && {address}),
			...(identification && {identification}),
		})
		.then((response) => response.data);

	return;
}

export async function getCustomers(): Promise<CustomerSummaryDTO[]> {
	const customers = axios
		.get<CustomerSummaryDTO[]>(`${import.meta.env.VITE_BACKEND_API}/customers`)
		.then((response) => response.data);

	return customers;
}

export async function getCustomersByPartialName(partialName: string): Promise<string[]> {
	const customers = axios
		.get<string[]>(`${import.meta.env.VITE_BACKEND_API}/customers/autocomplete/${partialName}`)
		.then((response) => response.data);

	return customers;
}
