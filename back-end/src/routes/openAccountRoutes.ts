import z from "zod";
import {FastifyTypedInstance} from "../types/fastify-typed-instace";
import * as service from "../services/open-account";

export function openAccountRoutes(app: FastifyTypedInstance) {
	app.get(
		"/open-accounts/:customerCode",
		{
			schema: {
				description: "Get Open Account By Id",
				tags: ["Open Accounts"],
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
			const openAccounts = await service.GetOpenAccountByCode(code);
			return reply.status(200).send(openAccounts);
		}
	);

	app.post(
		"/open-accounts/settle/:customerCode",
		{
			schema: {
				description: "Settle Open Account By Id",
				tags: ["Open Accounts"],
				params: z.object({
					customerCode: z.coerce.number().int(),
				}),
			},
		},
		async (request, reply) => {
			const {customerCode: code} = request.params;
			await service.SettleOpenAccountByCode(code);
			return reply.status(204).send();
		}
	);
}
