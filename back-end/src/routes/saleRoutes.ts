import z from "zod";
import { FastifyTypedInstance } from "../types";
import * as service from "../services/sale";

export async function salesRoutes(app: FastifyTypedInstance) {
    app.post("/sales", {
        schema: {
            description: "Register a sale",
            tags: ["Sales"],
            body: z.object({
                numItems: z.coerce.number().int(),
                totalPaid: z.number(),
                products: z.array(z.object({
                    code: z.coerce.number().int(),
                    numItems: z.coerce.number().int(),
                    discount: z.coerce.number(),
                    price: z.coerce.number(),
                    valuePaid: z.coerce.number()
                }))
            }),
            response: {
                201: z.null().describe("Sale registered!") 
            }
        }
    }, async (response, reply) => {
        const { numItems, totalPaid, products } = response.body

        await service.RegisterSale({ numItems, totalPaid, products })
        return reply.code(201).send()

    })

    app.get("/sales", {
        schema: {
            description: "Get All Sales",
            tags: ["Sales"],
            response: {
                200: z.array(z.object({
                    saleId: z.number().int(),
                    totalPaid: z.number(),
                    numItems: z.number().int(),
                    timestamp: z.date(),
                    productNames: z.array(z.string())
                }))
            }
        }
    }, async (_, reply) => {
        const sales = await service.GetAllSales()
        reply.status(200).send(sales)
    })

    app.get("/sales/:saleId", {
        schema: {
            description: "Get Sale",
            params: z.object({
                saleId: z.coerce.number().int()
            }),
            tags: ["Sales"],
            response: {
                200: z.object({
                    saleId: z.number().int(),
                    totalPaid: z.number(),
                    numItems: z.number().int(),
                    timestamp: z.date(),
                    products: z.array(z.object({
                        name: z.string(),
                        numItems: z.number().int(),
                        totalPaid: z.number()
                    }))
                })
            }
        }
    }, async (request, reply) => {
        const { saleId } = request.params
        const sale = await service.GetSale(saleId)
        reply.status(200).send(sale)
    })
}