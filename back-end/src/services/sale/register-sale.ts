import { prismaClient } from "../../database/prisma-client"

interface RegisterSaleProps {
    numItems: number
    totalPaid: number
    products: {
        code: number,
        numItems: number,
        discount: number,
        price: number,
        valuePaid: number
    }[]
}

async function RegisterSale({numItems, totalPaid, products} : RegisterSaleProps) {

    if(products == undefined || products.length == 0) {
        throw new Error("Cannot register Sale with no Products")
    }

    await prismaClient.$transaction(async (pClient) => {

        // Find Products
        const productsFound = await pClient.product.findMany({
            where: {
                code: {
                    in: products.map(p => p.code),
                },
            },
        });

        // Check if stock is sufficient for each product
        for (const { code, numItems } of products) {
            const product = productsFound.find(p => p.code === code);

            if(!product) {
                throw new Error(`Product with code ${code} not found.`);
            }

            if (product.stockAmount < numItems) {
                throw new Error(`Insufficient stock for product ${code}.`);
            }
        }

        // Register Sale
        await pClient.sale.create({
            data: {
                numItems,
                totalPaid,
                customer: "John Doe",
                productSold: {
                    create: products.map(({ code, numItems, discount, valuePaid, price }) => ({
                        product: { 
                            connect: { code }
                        },
                        numItems,
                        discount,
                        valuePaid,
                        price
                    }))
                }
            }
        })

        // Update stock for each product one by one
        for (const { code, numItems } of products) {
            const product = products.find(p => p.code === code);
            if (product) {
                await pClient.product.update({
                    where: { code },
                    data: {
                        stockAmount: {
                            decrement: numItems, // Decrease stock by the quantity sold
                        },
                    },
                });
            }
        }
    })
}

export { RegisterSale }