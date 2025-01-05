import z from "zod";
import { FastifyTypedInstance } from "./types";
import * as service from "./services/product";

export async function routes(app: FastifyTypedInstance) {
    app.get("/products", {
        schema: {
            description: "List Products",
            tags: ["Products"],
            response: {
                200: z.array(z.object({
                    name: z.string(),
                    code: z.number().int(),
                    sellPrice: z.number(),
                    stockAmount: z.number()
                }))
            }
        }
    }, async (_, reply) => {
        const products = await service.GetAllProducts()
        return reply.status(200).send(products)
    })

    app.get("/products/:code", {
        schema: {
            description: "List Products",
            tags: ["Products"],
            params: z.object({
                code: z.coerce.number().int()
            }),
            response: {
                200: z.object({
                    name: z.string(),
                    code: z.number().int(),
                    sellPrice: z.number(),
                    stockAmount: z.number()
                })
            }
        }
    }, async (request, reply) => {
        const { code } = request.params
        const products = await service.GetProductByCode(code)
        return reply.status(200).send(products)
    })

    app.post("/products", {
        schema: {
            description: "Register a new Product",
            tags: ["Products"],
            body: z.object({
                name: z.string(),
                code: z.number().int(),
                sellPrice: z.number(),
                stockAmount: z.number()
            }),
            response: {
                201: z.null().describe("Product registered!")
            }
        }
    }, async (response, reply) => {
        const { code, name, sellPrice, stockAmount } = response.body;

        service.CreateProduct({
            code,
            name,
            sellPrice,
            stockAmount
        })

        return reply.status(201).send()
    })
}