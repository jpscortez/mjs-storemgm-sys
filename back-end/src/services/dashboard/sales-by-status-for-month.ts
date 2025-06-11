import {prismaClient} from "../../database/prisma-client";
import {startOfMonth, endOfMonth} from "date-fns";

export async function GetSalesByStatusForMonth() {
	const currentMonthStart = startOfMonth(new Date()); // Get the start of the current month
	const currentMonthEnd = endOfMonth(new Date());

	const salesByStatusForMonth = await prismaClient.sale
		.findMany({
			where: {
				timestamp: {
					gte: currentMonthStart,
					lte: currentMonthEnd,
				},
			},
			select: {
				totalPaid: true,
				isOpen: true,
				timestamp: true,
			},
		})
		.then((rawSalesByStatus) => {
			return rawSalesByStatus.map(({totalPaid: total, isOpen, timestamp}) => ({
				total,
				isOpen,
				day: timestamp.getDate(),
			}));
		});

	const accSalesByStatusForMonth: {[day: string]: {Recebido: number; Devido: number; day: string}} = {};
	const today = new Date().getDate();

	for (let day = 1; day <= today; day++) {
		accSalesByStatusForMonth[day] = {Recebido: 0, Devido: 0, day: day.toFixed(0)};
	}

	salesByStatusForMonth.forEach((raw) => {
		for (let day = raw.day; day <= today; day++) {
			if (raw.isOpen) {
				accSalesByStatusForMonth[day].Devido += raw.total;
			} else {
				accSalesByStatusForMonth[day].Recebido += raw.total;
			}
		}
	});

	return Object.values(accSalesByStatusForMonth);
}
