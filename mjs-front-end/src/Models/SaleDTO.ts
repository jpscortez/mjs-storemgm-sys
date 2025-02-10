export type SaleDTO = {
    products: SaleProductDTO[],
    totalPaid: number,
    numItems: number
}

export type SaleProductDTO = {
    code: string,
    numItems: number,
    discount: number,
    price: number,
    valuePaid: number
}