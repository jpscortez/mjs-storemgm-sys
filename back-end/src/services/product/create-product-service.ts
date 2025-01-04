import { prismaClient } from "../../database/prisma-client"

type CreateProductType = {
    name: string,
    code: number,
    sellPrice: number,
    stockAmount: number
}

async function CreateProduct({ name, code, sellPrice, stockAmount }: CreateProductType) {

    await prismaClient.product.create({
        data: {
            name,
            code,
            sellPrice,
            stockAmount
        }
    })
}

export { CreateProduct }