import {prismaClient} from "../../database/prisma-client";

export async function GetCustomers() {
	return await prismaClient.customer
		.findMany({
			include: {
				_count: {
					select: {
						purchases: true,
					},
				},
			},
		})
		.then((customersRaw) => {
			return customersRaw.map(({code, name, _count}) => {
				return {
					code,
					name,
					numberOfPurchases: _count.purchases,
				};
			});
		});
}
