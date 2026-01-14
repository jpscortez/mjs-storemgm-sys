import z from "zod";
import {FastifyTypedInstance} from "../types/fastify-typed-instace";
import * as service from "../services/health";

export async function healthRoutes(app: FastifyTypedInstance) {
	app.get(
		"/health",
		{
			schema: {
				description: "Health Status",
				tags: ["Health"],
				response: {
					200: z.object({
						status: z.enum(["up", "down"]),
					}),
					503: z.object({
						status: z.enum(["up", "down"]),
					}),
				},
			},
		},
		async (_, reply) => {
			const status = await service.GetHealthStatus();
			if (status) {
				reply.status(200).send({status: "up"});
			} else {
				reply.status(200).send({status: "down"});
			}
		}
	);
}
