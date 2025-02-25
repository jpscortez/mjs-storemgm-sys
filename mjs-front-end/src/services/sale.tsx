import axios from "axios";
import {SaleDTO} from "@/Models/SaleDTO";
import {Sale} from "@/Models/Sale";
import {SaleDetail} from "@/Models/SaleDetail";

export async function registerSale({
	products,
	totalPaid,
	numItems,
	customer,
	paymentMethod,
}: SaleDTO): Promise<{code: number}> {
	const data = await axios
		.post("http://localhost:3333/sales", {products, totalPaid, numItems, customer, paymentMethod})
		.then((response) => response.data);

	return data;
}

export async function getSales(): Promise<Sale[]> {
	const sales = await axios.get<Sale[]>("http://localhost:3333/sales").then((response) => response.data);

	return sales;
}

export async function getSale(saleId: number): Promise<SaleDetail> {
	const sale = await axios.get<SaleDetail>(`http://localhost:3333/sales/${saleId}`).then((response) => response.data);

	return sale;
}
