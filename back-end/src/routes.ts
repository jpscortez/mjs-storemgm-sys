import z, { number } from "zod";
import { FastifyTypedInstance } from "./types";
import * as service from "./services/product/create-product-service";
import { GetAllProducts } from "./services/product/get-all-product-service";

interface Product {
    name: string,
    code: number,
    sellPrice: number,
    stockAmount: number
}

const products: Product[] = []

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
        const products = await GetAllProducts()
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