import {prismaClient} from "../../database/prisma-client";
import {normalizeName} from "../../helpers/removerAcentos";

export async function GetCustomerAutocompleteByPartialName(partialName: string): Promise<string[]> {
	// Remover acentos
	const partialNameNoAccent = normalizeName(partialName);

	// Buscar todos os clientes
	const customerNames = await prismaClient.customer
		.findMany({
			select: {
				name: true,
			},
		})
		.then((customers) => customers.map(({name}) => name));

	// Filtrar clientes, ignorando acentos
	const filteredCustomers = customerNames.filter((name) => {
		const clientNameNoAccent = normalizeName(name);
		return clientNameNoAccent.includes(partialNameNoAccent);
	});

	return filteredCustomers;
}
