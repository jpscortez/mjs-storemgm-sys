import z from "zod";
import * as service from "../services/auth";
import {FastifyTypedInstance} from "../types/fastify-typed-instace";

export async function authRoutes(app: FastifyTypedInstance) {
	app.post(
		"/auth/signIn",
		{
			schema: {
				description: "Create User",
				tags: ["Auth"],
				body: z.object({
					username: z.string(),
					password: z.string(),
				}),
				response: {
					200: z.object({
						user: z.object({
							name: z.string(),
							username: z.string(),
							id: z.coerce.number().int(),
						}),
						token: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const {username, password} = request.body;
			const authToken = await service.Login(username, password);
			return reply.code(200).send(authToken);
		}
	);

	app.get(
		"/auth/authenticate",
		{
			preHandler: [app.authenticate],
			schema: {
				description: "Authenticate by token",
				tags: ["Auth"],
				response: {
					200: z.object({
						name: z.string(),
						username: z.string(),
						id: z.coerce.number().int(),
					}),
				},
			},
		},
		(request, reply) => {
			const user = request.user;

			reply.code(200).send(user);
		}
	);
}
