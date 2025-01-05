import { prismaClient } from "../../database/prisma-client"

type UpdateProductType = {
    name: string,
    code: number,
    sellPrice: number,
    stockAmount: number
}

async function UpdateProduct({ name, code, sellPrice, stockAmount }: UpdateProductType) {

    await prismaClient.product.update({
        where: {
            code
        },
        data: {
            name,
            sellPrice,
            stockAmount
        }
    })
}

export { UpdateProduct }