import { prismaClient } from "../../database/prisma-client"

async function GetProductByCode(code: number) {

    const products = await prismaClient.product.findFirstOrThrow({
        where: {
            code: code
        }
    }).then(({ code, name, sellPrice, stockAmount }) => {
        return { code, name, sellPrice: sellPrice.toNumber(), stockAmount }
    })

    return products
}

export { GetProductByCode }