import { Product } from "@/Models/Product";
import axios from "axios";

export async function getProducts() : Promise<Product[]> {
    const products = axios.get("http://localhost:3333/products")
        .then(response => response.data)

    return products        
}

interface CreateProductsRequest {
    name: string,
    sellPrice: number,
    stockAmount: number,
    code?: number,
}

export async function createProduct({ code, name, sellPrice, stockAmount }: CreateProductsRequest) : Promise<void> {
    await axios.post("http://localhost:3333/products", {code, name, sellPrice, stockAmount})
}