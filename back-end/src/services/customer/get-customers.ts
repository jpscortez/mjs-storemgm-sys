import {prismaClient} from "../../database/prisma-client";

export async function GetCustomers() {
	return await prismaClient.customer.findMany({}).then((customersRaw) => {
		return customersRaw.map(({code, name, phoneNumber, address, identification}) => {
			return {
				code,
				name,
				status: {
					phoneNumber: phoneNumber !== null,
					address: address !== null,
					identification: identification !== null,
				},
			};
		});
	});
}
