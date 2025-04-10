import z from "zod";
import {FastifyTypedInstance} from "../types";
import * as service from "../services/dashboard";

export async function dashboardRoutes(app: FastifyTypedInstance) {
	app.get(
		"/dashboard/open-accounts",
		{
			schema: {
				description: "Get Open Accounts for Dashboard",
				tags: ["Dashboard"],
				response: {
					200: z.array(
						z.object({
							customerCode: z.number().int(),
							name: z.string(),
							total: z.number(),
						})
					),
				},
			},
		},
		async (_, reply) => {
			const openAccounts = await service.GetOpenAccounts();
			return reply.status(200).send(openAccounts);
		}
	);

	app.get(
		"/dashboard/sales-by-payment-method",
		{
			schema: {
				description: "Get Sales By Payment Methods for Dashboard",
				tags: ["Dashboard"],
				response: {
					200: z.array(
						z.object({
							paymentMethod: z.string(),
							total: z.number(),
						})
					),
				},
			},
		},
		async (_, reply) => {
			const salesByPaymentMethods = await service.GetSalesByPaymentMethod();
			return reply.code(200).send(salesByPaymentMethods);
		}
	);

	app.get(
		"/dashboard/sales-by-status-for-month",
		{
			schema: {
				description: "Get Sales By Status for Current Month for Dashboard",
				tags: ["Dashboard"],
				response: {
					201: z.array(
						z.object({
							Recebido: z.number(),
							Devido: z.number(),
							day: z.string(),
						})
					),
				},
			},
		},
		async (_, reply) => {
			const data = await service.GetSalesByStatusForMonth();
			return reply.code(201).send(data);
		}
	);
}
