import {prismaClient} from "../../database/prisma-client";

export async function GetOpenDebtsByCode(code: number) {
	return await prismaClient.customer
		.findFirstOrThrow({
			where: {
				code,
			},
			select: {
				code: true,
				name: true,
				purchases: {
					where: {
						isOpen: true,
					},
					select: {
						timestamp: true,
						productSold: {
							include: {
								product: {
									select: {
										code: true,
										name: true,
									},
								},
							},
						},
					},
				},
			},
		})
		.then(({code, name, purchases: rawPurchases}) => {
			let total = 0;
			const products = rawPurchases.flatMap(({productSold, timestamp}) => {
				return productSold.map(({product: {name, code}, price, numItems, valuePaid}) => {
					total += valuePaid;
					return {
						timestamp,
						code,
						name,
						price,
						amount: numItems,
						total: valuePaid,
					};
				});
			});

			return {
				code,
				name,
				total,
				products,
			};
		});
}
