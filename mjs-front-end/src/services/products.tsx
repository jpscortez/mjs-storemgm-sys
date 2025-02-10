import { Product } from "@/Models/Product";
import axios from "axios";

export async function getProducts() : Promise<Product[]> {
    const products = await axios.get<Product[]>("http://localhost:3333/products")
        .then(response => response.data)

    return products        
}

interface CreateProductsRequest {
    name: string,
    sellPrice: number,
    stockAmount: number,
    code?: number,
}

export async function createProduct({ code, name, sellPrice, stockAmount } : CreateProductsRequest) : Promise<void> {
    await axios.post("http://localhost:3333/products", {code, name, sellPrice, stockAmount})
}

export async function getProduct(code: number) : Promise<Product> {
    const product = axios.get<Product>(`http://localhost:3333/products/${code}`)
        .then(response => response.data)

    return product
}

export async function deleteProduct(code: number) {
    await axios.delete(`http://localhost:3333/products/${code}`)
}

interface UpdateProductsRequest {
    name: string,
    sellPrice: number,
    stockAmount: number,
    code: number,
}

export async function updateProduct({ code, name, sellPrice, stockAmount } : UpdateProductsRequest) : Promise<void> {
    await axios.put(`http://localhost:3333/products/${code}`, {name, sellPrice, stockAmount})
}