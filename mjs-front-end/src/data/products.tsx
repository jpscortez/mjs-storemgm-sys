import { Product } from "@/Models/Product";

export async function getProducts() {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return products
}

interface CreateProductsRequest {
    description: string,
    sellPrice: number,
    stockUnits: number,
    code?: number,
}

export async function createProduct({ code, description, sellPrice, stockUnits }: CreateProductsRequest) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    code = code ?? 0
    products.push({ code, description, sellPrice, stockUnits })

    console.log(`Remember to save!!!!`)
}

const products: Product[] = [
    {
        description: 'Apple MacBook Pro 17"',
        code: 0,
        stockUnits: 15,
        sellPrice: 2999
    },
    {
        description: 'Microsoft Surface Pro',
        code: 1,
        stockUnits: 15,
        sellPrice: 1999
    },
    {
        description: 'Magic Mouse 2',
        code: 2,
        stockUnits: 15,
        sellPrice: 99
    },
]