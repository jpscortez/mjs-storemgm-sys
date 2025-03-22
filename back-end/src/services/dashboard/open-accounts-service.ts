import {prismaClient} from "../../database/prisma-client";

export async function GetOpenAccounts() {
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
		.then((accountRaw) => {
			return accountRaw.map(({code, name, purchases}) => {
				return {
					customerCode: code,
					name,
					total: purchases.map((p) => p.totalPaid).reduce((total, p) => (total += p), 0),
				};
			});
		});
}
