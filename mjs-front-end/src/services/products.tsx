import {Product} from "@/Models/Product";
import axios from "axios";

export async function getProducts(): Promise<Product[]> {
	const products = await axios
		.get<Product[]>(`${import.meta.env.VITE_BACKEND_API}/products`)
		.then((response) => response.data);

	return products;
}

interface CreateProductsRequest {
	name: string;
	sellPrice: number;
	stockAmount: number;
	code?: number;
}

export async function createProduct({code, name, sellPrice, stockAmount}: CreateProductsRequest): Promise<void> {
	await axios.post(`${import.meta.env.VITE_BACKEND_API}/products`, {code, name, sellPrice, stockAmount});
}

export async function getProduct(code: number): Promise<Product> {
	const product = axios
		.get<Product>(`${import.meta.env.VITE_BACKEND_API}/products/${code}`)
		.then((response) => response.data);

	return product;
}

export async function deleteProduct(code: number) {
	await axios.delete(`${import.meta.env.VITE_BACKEND_API}/products/${code}`);
}

interface UpdateProductsRequest {
	name: string;
	sellPrice: number;
	stockAmount: number;
	code: number;
}

export async function updateProduct({code, name, sellPrice, stockAmount}: UpdateProductsRequest): Promise<void> {
	await axios.put(`${import.meta.env.VITE_BACKEND_API}/products/${code}`, {name, sellPrice, stockAmount});
}
