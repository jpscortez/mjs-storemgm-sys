import {fastify} from "fastify";
import {fastifyCors} from "@fastify/cors";
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import {fastifySwagger} from "@fastify/swagger";
import {fastifySwaggerUi} from "@fastify/swagger-ui";
import {productRoutes} from "./routes/productRoutes";
import {salesRoutes} from "./routes/saleRoutes";
import {customerRoutes} from "./routes/customerRoutes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {origin: "*"});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "MJS Backend",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(productRoutes);
app.register(salesRoutes);
app.register(customerRoutes);

app.listen({port: 3333, host: "0.0.0.0"}, (err: Error | null, address: string) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Fastify listening at ${address}`);
});
