import { prismaClient } from "../../database/prisma-client"

async function GetAllProducts() {

    const products = (await prismaClient.product.findMany({}))
        .map(({ code, name, sellPrice, stockAmount }) => {
            return { code, name, sellPrice: sellPrice.toNumber(), stockAmount }
        })

    return products
}

export { GetAllProducts }