export type SaleDTO = {
    products: SaleProductDTO[],
    total: number,
    amount: number
}

export type SaleProductDTO = {
    code: string,
    amount: number,
    discount: number,
    price: number,
    total: number
}