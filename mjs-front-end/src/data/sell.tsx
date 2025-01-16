import { SaleDTO } from "@/Models/SaleDTO";

export async function registerSale(sale: SaleDTO) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(sale)
}