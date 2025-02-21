import z from "zod";
import {FastifyTypedInstance} from "../types";
import * as service from "../services/customer";

export async function customerRoutes(app: FastifyTypedInstance) {
	app.get(
		"/customers/autocomplete/:partialName",
		{
			schema: {
				description: "Get all Users with name including 'partialName'",
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
