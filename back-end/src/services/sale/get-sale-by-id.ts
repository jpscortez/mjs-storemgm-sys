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
				customer: true,
			},
		})
		.then(({code, totalPaid: total, numItems: nItems, timestamp, productSold, customer, payment}) => {
			return {
				saleId: code,
				totalPaid: total,
				numItems: nItems,
				timestamp,
				customer: {
					code: customer!.code,
					name: customer!.name,
					...(customer!.phoneNumber && {phoneNumber: customer!.phoneNumber}),
					...(customer!.address && {address: customer!.address}),
					...(customer!.identification && {identification: customer!.identification}),
				},
				paymentMethod: payment!.method,
				products: productSold.map(
					({productCode, product, numItems: productNumItems, valuePaid: totalPaid, price}) => {
						return {
							code: productCode,
							name: product.name,
							numItems: productNumItems,
							price,
							totalPaid,
						};
					}
				),
			};
		});

	return sale;
}
