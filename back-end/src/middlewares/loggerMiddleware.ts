import {FastifyRequest, FastifyReply} from "fastify";

// Middleware function to log all incoming requests
const loggerMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
	// Log the incoming request method and URL
	console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);

	// Call the next handler in the request lifecycle
	// Fastify automatically continues the request cycle after this
};

export default loggerMiddleware;
