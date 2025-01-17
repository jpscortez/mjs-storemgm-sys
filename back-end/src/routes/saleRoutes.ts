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

        service.RegisterSale({ numItems, totalPaid, products })
        return reply.code(201).send()

    })
}