import z from "zod";
import {FastifyTypedInstance} from "../types/fastify-typed-instace";
import * as service from "../services/sale";

export async function salesRoutes(app: FastifyTypedInstance) {
	app.post(
		"/sales",
		{
			schema: {
				description: "Register a sale",
				tags: ["Sales"],
				body: z.object({
					numItems: z.coerce.number().int(),
					totalPaid: z.number(),
					products: z.array(
						z.object({
							code: z.coerce.number().int(),
							numItems: z.coerce.number().int(),
							discount: z.coerce.number(),
							price: z.coerce.number(),
							valuePaid: z.coerce.number(),
						})
					),
					customer: z.string(),
					paymentMethod: z.string(),
				}),
				response: {
					201: z
						.object({
							code: z.number().int(),
						})
						.describe("Sale registered!"),
				},
			},
		},
		async (response, reply) => {
			const {numItems, totalPaid, products, customer, paymentMethod} = response.body;

			const code = await service.RegisterSale({
				numItems,
				totalPaid,
				products,
				soldToCustomer: customer,
				paymentMethod,
			});
			return reply.code(201).send({code});
		}
	);

	app.get(
		"/sales",
		{
			schema: {
				description: "Get All Sales",
				tags: ["Sales"],
				response: {
					200: z.array(
						z.object({
							code: z.number().int(),
							totalPaid: z.number(),
							customerName: z.string(),
							numItems: z.number().int(),
							timestamp: z.date(),
							productNames: z.array(z.string()),
							isOpen: z.boolean(),
						})
					),
				},
			},
		},
		async (_, reply) => {
			const sales = await service.GetAllSales();
			reply.status(200).send(sales);
		}
	);

	app.get(
		"/sales/:saleId",
		{
			schema: {
				description: "Get Sale",
				params: z.object({
					saleId: z.coerce.number().int(),
				}),
				tags: ["Sales"],
				response: {
					200: z.object({
						saleId: z.number().int(),
						totalPaid: z.number(),
						numItems: z.number().int(),
						timestamp: z.date(),
						products: z.array(
							z.object({
								code: z.number().int(),
								name: z.string(),
								numItems: z.number().int(),
								price: z.number(),
								totalPaid: z.number(),
							})
						),
						customer: z.object({
							code: z.number().int(),
							name: z.string(),
							phoneNumber: z.string().optional(),
							address: z.string().optional(),
							identification: z.string().optional(),
						}),
						paymentMethod: z.string(),
						isOpen: z.boolean(),
					}),
				},
			},
		},
		async (request, reply) => {
			const {saleId} = request.params;
			const sale = await service.GetSale(saleId);
			reply.status(200).send(sale);
		}
	);
}
