import {prismaClient} from "../../database/prisma-client";

export async function GetCustomerDetail(customerCode: number) {
	return prismaClient.customer
		.findFirstOrThrow({
			where: {
				code: customerCode,
			},
			select: {
				code: true,
				name: true,
				purchases: true,
				address: true,
				identification: true,
				phoneNumber: true,
			},
		})
		.then(({code, name, purchases, address, identification, phoneNumber}) => {
			const curtomerSince = purchases.reduce(
				(firstDate, p) => (firstDate > p.timestamp ? p.timestamp : firstDate),
				new Date(Date.now())
			);

			const missingComplements = !(
				address &&
				address.length > 0 &&
				identification &&
				identification.length > 0 &&
				phoneNumber &&
				phoneNumber.length > 0
			);

			return {
				code,
				name,
				curtomerSince,
				...(phoneNumber && {phoneNumber}),
				...(address && {address}),
				...(identification && {identification}),
				missingComplements,
				purchases: purchases.map(({code, numItems, timestamp, totalPaid}) => {
					return {code, numItems, timestamp, totalPaid};
				}),
			};
		});
}
