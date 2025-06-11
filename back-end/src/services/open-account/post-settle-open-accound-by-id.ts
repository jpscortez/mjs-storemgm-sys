import {prismaClient} from "../../database/prisma-client";

export async function SettleOpenAccountByCode(code: number) {
	return await prismaClient.sale.updateMany({
		where: {
			customer: {
				code,
			},
		},
		data: {
			isOpen: false,
		},
	});
}
