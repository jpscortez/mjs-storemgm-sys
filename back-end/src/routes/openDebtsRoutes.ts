import z from "zod";
import {FastifyTypedInstance} from "../types/fastify-typed-instace";
import * as service from "../services/open-debts";

export function openDebtsRoutes(app: FastifyTypedInstance) {
	app.get(
		"/open-debts",
		{
			schema: {
				description: "Get All Open Debts",
				tags: ["Open Debt"],
				response: {
					200: z.array(
						z.object({
							code: z.number().int(),
							name: z.string(),
							total: z.number(),
							openSince: z.date(),
						})
					),
				},
			},
		},
		async (_, reply) => {
			const openDebts = await service.GetAllOpenDebts();
			return reply.status(200).send(openDebts);
		}
	);

	app.get(
		"/open-debts/:customerCode",
		{
			schema: {
				description: "Get Open Debts By Id",
				tags: ["Open Debt"],
				params: z.object({
					customerCode: z.coerce.number().int(),
				}),
				response: {
					200: z.object({
						code: z.number().int(),
						name: z.string(),
						total: z.number(),
						products: z.array(
							z.object({
								timestamp: z.date(),
								code: z.number().int(),
								name: z.string(),
								price: z.number(),
								amount: z.number().int(),
								total: z.number(),
							})
						),
					}),
				},
			},
		},
		async (request, reply) => {
			const {customerCode: code} = request.params;
			const openDebts = await service.GetOpenDebtsByCode(code);
			return reply.status(200).send(openDebts);
		}
	);

	app.post(
		"/open-debts/settle/:customerCode",
		{
			schema: {
				description: "Settle Open Debts By Id",
				tags: ["Open Debt"],
				params: z.object({
					customerCode: z.coerce.number().int(),
				}),
				body: z.object({
					paymentMethod: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const {customerCode: code} = request.params;
			const {paymentMethod} = request.body;
			await service.SettleOpenDebtsByCode(code, paymentMethod);
			return reply.status(204).send();
		}
	);
}
