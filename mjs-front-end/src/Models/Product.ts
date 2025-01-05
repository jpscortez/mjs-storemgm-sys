export type Product = {
    name: string,
    code: number,
    sellPrice: number,
    stockAmount: number
}

export type SoldProduct = {
    name: string,
    code: string,
    amount: number,
    price: number,
    discount: number
}