export type Product = {
    description: string,
    code: number,
    sellPrice: number,
    stockUnits: number
}

export type SoldProduct = {
    name: string,
    code: string,
    amount: number,
    price: number,
    discount: number
}