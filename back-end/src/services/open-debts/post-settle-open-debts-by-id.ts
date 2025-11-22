import {prismaClient} from "../../database/prisma-client";

export async function SettleOpenDebtsByCode(customerCode: number, newPaymentMethod: string) {
	return await prismaClient.$transaction(async (tx) => {
		// 1️⃣ Buscar todas as sales abertas do cliente, incluindo pagamentos
		const openSales = await tx.sale.findMany({
			where: {
				customerCode,
				isOpen: true,
			},
			include: {
				payment: true,
			},
		});

		const saleIds = openSales.map((s) => s.code);
		const paymentIds = openSales.filter((s) => s.payment).map((s) => s.payment!.code);

		if (saleIds.length === 0) {
			return;
		}

		// 2️⃣ Atualizar todas as sales de uma vez
		await tx.sale.updateMany({
			where: {
				code: {in: saleIds},
			},
			data: {
				isOpen: false,
			},
		});

		// 3️⃣ Atualizar todos os pagamentos associados
		if (paymentIds.length > 0) {
			await tx.payment.updateMany({
				where: {code: {in: paymentIds}},
				data: {
					method: newPaymentMethod,
				},
			});
		}
	});
}
