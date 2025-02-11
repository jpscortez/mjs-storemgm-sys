import { prismaClient } from "../../database/prisma-client";

export async function GetSale(code: number) {
    const sale = await prismaClient.sale.findFirstOrThrow({
        where: { 
            code: code
        },
        include: {
            productSold: {
                include: {
                    product: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    }).then(({ code, totalPaid: total, numItems: nItems, timestamp, productSold }) => {
        return {
            saleId: code,
            totalPaid: total,
            numItems: nItems,
            timestamp,
            products: productSold.map(({product, numItems: productNumItems, valuePaid: totalPaid, price}) => {
                return {
                    name: product.name,
                    numItems: productNumItems,
                    price,
                    totalPaid
                }
            })
        }
    })

    return sale
}