import axios from "axios";

export async function getCustomersByPartialName(partialName: string): Promise<string[]> {
	const customers = axios
		.get<string[]>(`http://localhost:3333/customers/autocomplete/${partialName}`)
		.then((response) => response.data);

	return customers;
}
