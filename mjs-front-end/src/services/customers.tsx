import {CustomerDetailDTO} from "@/Models/CustomerDetailDTO";
import {CustomerSummaryDTO} from "@/Models/CustomerSummaryDTO";
import axios from "axios";

export async function getCustomerByCode(code: number): Promise<CustomerDetailDTO> {
	const customer = axios
		.get<CustomerDetailDTO>(`http://localhost:3333/customers/${code}`)
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
		.patch(`http://localhost:3333/customers/${code}`, {
			...(phoneNumber && {phoneNumber}),
			...(address && {address}),
			...(identification && {identification}),
		})
		.then((response) => response.data);

	return;
}

export async function getCustomers(): Promise<CustomerSummaryDTO[]> {
	const customers = axios
		.get<CustomerSummaryDTO[]>(`http://localhost:3333/customers`)
		.then((response) => response.data);

	return customers;
}

export async function getCustomersByPartialName(partialName: string): Promise<string[]> {
	const customers = axios
		.get<string[]>(`http://localhost:3333/customers/autocomplete/${partialName}`)
		.then((response) => response.data);

	return customers;
}
