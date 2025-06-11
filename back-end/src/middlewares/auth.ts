import {FastifyReply, FastifyRequest} from "fastify";
import {verifyToken} from "../helpers/jwt";
import {AuthUser} from "../models/auth-user";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new Error("No token provided.");
	}

	const parts = authHeader.split(" ");

	if (parts.length !== 2) {
		throw new Error("Token malformed.");
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		throw new Error("Token malformed.");
	}

	try {
		const decoded = verifyToken(token) as AuthUser;

		request.user = decoded;
	} catch (error) {
		throw new Error("Token invalid.");
	}
}
