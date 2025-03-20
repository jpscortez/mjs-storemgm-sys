import {prismaClient} from "../../database/prisma-client";

export async function GetAllSales() {
	const sales = (
		await prismaClient.sale.findMany({
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
			},
		})
	).map(({code, totalPaid, numItems, timestamp, productSold, isOpen}) => {
		return {
			saleId: code,
			totalPaid,
			numItems,
			timestamp,
			productNames: productSold.map((p) => p.product.name),
			isOpen,
		};
	});

	return sales;
}
