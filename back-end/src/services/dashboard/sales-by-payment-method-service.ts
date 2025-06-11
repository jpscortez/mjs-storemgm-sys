import {prismaClient} from "../../database/prisma-client";

export async function GetSalesByPaymentMethod() {
	const paymentMethodDict = await prismaClient.sale
		.findMany({
			select: {
				totalPaid: true,
				payment: true,
			},
		})
		.then((rawSales) => {
			return rawSales
				.map(({payment, totalPaid}) => {
					return {paymentMethod: payment!.method, total: totalPaid};
				})
				.reduce((acc, sale) => {
					const method = sale.paymentMethod;
					if (!(method in acc)) {
						acc[method] = 0;
					}
					acc[method] += sale.total;
					return acc;
				}, {} as {[paymentMethod: string]: number});
		});

	return Object.keys(paymentMethodDict).map((key) => {
		return {
			paymentMethod: key,
			total: paymentMethodDict[key],
		};
	});
}
