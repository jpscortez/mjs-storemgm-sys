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
				customer: true,
			},
		})
	).map(({code, totalPaid, numItems, timestamp, productSold, isOpen, customer}) => {
		return {
			code,
			customerName: customer ? customer.name : "",
			totalPaid,
			numItems,
			timestamp,
			productNames: productSold.map((p) => p.product.name),
			isOpen,
		};
	});

	return sales;
}
