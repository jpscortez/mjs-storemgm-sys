import { prismaClient } from "../../database/prisma-client"

async function DeleteProductByCode(code: number) {

    await prismaClient.product.delete({
        where: {
            code
        }
    })

    return
}

export { DeleteProductByCode }