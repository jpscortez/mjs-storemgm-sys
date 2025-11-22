import {prismaClient} from "../../database/prisma-client";

export async function GetAllOpenDebts() {
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
					code: code,
					name,
					total: purchases.map((p) => p.totalPaid).reduce((total, p) => (total += p), 0),
					openSince: purchases
						.map((p) => p.timestamp)
						.reduce((oldest, t) => (t < oldest ? t : oldest), purchases[0].timestamp),
				};
			});
		});
}
