// types/fastify.d.ts
import * as fastify from "fastify";
import {AuthUser} from "../models/auth-user";

// Extend FastifyRequest to include 'user'
declare module "fastify" {
	interface FastifyRequest {
		user: AuthUser;
	}

	export interface FastifyInstance {
		authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}
