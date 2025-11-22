import {prismaClient} from "../../database/prisma-client";

export async function GetOpenDebts() {
	return await prismaClient.customer
		.findMany({
			where: {
				purchases: {
					some: {
						isOpen: true,
					},
				},
			},
			select: {
				code: true,
				name: true,
				purchases: {
					where: {
						isOpen: true, // You can also include the sales with isOpen = true if needed
					},
				},
			},
		})
		.then((debtRaw) => {
			return debtRaw.map(({code, name, purchases}) => {
				return {
					customerCode: code,
					name,
					total: purchases.map((p) => p.totalPaid).reduce((total, p) => (total += p), 0),
				};
			});
		});
}
