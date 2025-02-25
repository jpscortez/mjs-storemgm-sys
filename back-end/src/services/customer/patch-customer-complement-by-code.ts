import {prismaClient} from "../../database/prisma-client";

export async function PatchCustomerComplementByCode(
	code: number,
	{phoneNumber, address, identification}: {phoneNumber?: string; address?: string; identification?: string}
) {
	await prismaClient.customer.update({
		where: {
			code,
		},
		data: {
			...(phoneNumber && {phoneNumber}),
			...(address && {address}),
			...(identification && {identification}),
		},
	});
}
