import {prismaClient} from "../../database/prisma-client";

export async function GetSale(code: number) {
	const sale = await prismaClient.sale
		.findFirstOrThrow({
			where: {
				code: code,
			},
			include: {
				productSold: {
					include: {
						product: {
							select: {
								name: true,
							},
						},
					},
				},
				payment: {
					select: {
						method: true,
					},
				},
				customer: {
					select: {
						code: true,
						name: true,
					},
				},
			},
		})
		.then(({code, totalPaid: total, numItems: nItems, timestamp, productSold, customer, payment}) => {
			return {
				saleId: code,
				totalPaid: total,
				numItems: nItems,
				timestamp,
				customer: customer!,
				paymentMethod: payment!.method,
				products: productSold.map(({product, numItems: productNumItems, valuePaid: totalPaid, price}) => {
					return {
						name: product.name,
						numItems: productNumItems,
						price,
						totalPaid,
					};
				}),
			};
		});

	return sale;
}
