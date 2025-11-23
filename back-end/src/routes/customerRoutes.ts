import z from "zod";
import {FastifyTypedInstance} from "../types/fastify-typed-instace";
import * as service from "../services/customer";

export async function customerRoutes(app: FastifyTypedInstance) {
	app.get(
		"/customers",
		{
			schema: {
				description: "Get all Customers",
				tags: ["Customers"],
				response: {
					200: z.array(
						z.object({
							code: z.number().int(),
							name: z.string(),
							status: z.object({
								phoneNumber: z.boolean(),
								address: z.boolean(),
								identification: z.boolean(),
							}),
						})
					),
				},
			},
		},
		async (_, reply) => {
			const customers = await service.GetCustomers();
			return reply.code(200).send(customers);
		}
	);

	app.get(
		"/customers/:customerCode",
		{
			schema: {
				description: "Get Customers by code",
				tags: ["Customers"],
				params: z.object({
					customerCode: z.coerce.number().int(),
				}),
				response: {
					200: z.object({
						code: z.number().int(),
						name: z.string(),
						curtomerSince: z.date(),
						phoneNumber: z.string().optional(),
						address: z.string().optional(),
						identification: z.string().optional(),
						missingComplements: z.boolean(),
						purchases: z.array(
							z.object({
								code: z.number().int(),
								numItems: z.number().int(),
								timestamp: z.date(),
								totalPaid: z.number(),
								isOpen: z.boolean(),
							})
						),
					}),
				},
			},
		},
		async (request, reply) => {
			const {customerCode} = request.params;
			const customers = await service.GetCustomerDetail(customerCode);
			return reply.code(200).send(customers);
		}
	);

	app.patch(
		"/customers/:customerCode",
		{
			schema: {
				description: "Get all Customers",
				tags: ["Customers"],
				params: z.object({
					customerCode: z.coerce.number().int(),
				}),
				body: z.object({
					phoneNumber: z.string().optional(),
					address: z.string().optional(),
					identification: z.string().optional(),
				}),
				response: {
					204: z.null().describe("Customer updated!"),
				},
			},
		},
		async (request, reply) => {
			const {customerCode} = request.params;
			const {address, identification, phoneNumber} = request.body;
			await service.PatchCustomerComplementByCode(customerCode, {
				address,
				identification,
				phoneNumber,
			});
			return reply.code(204).send();
		}
	);

	app.get(
		"/customers/autocomplete/:partialName",
		{
			schema: {
				description: "Get all Customers with name including 'partialName'",
				tags: ["Customers"],
				params: z.object({
					partialName: z.string(),
				}),
				response: {
					200: z.array(z.string()),
				},
			},
		},
		async (request, reply) => {
			const {partialName} = request.params;
			const customerNames = await service.GetCustomerAutocompleteByPartialName(partialName);
			return reply.code(200).send(customerNames);
		}
	);
}
