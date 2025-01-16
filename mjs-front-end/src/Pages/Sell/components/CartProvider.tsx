import { SoldProduct } from "@/Models/Product";
import { createContext, ReactNode, useState } from "react";

interface CartContextType {
    products: SoldProduct[]
    addProduct: (newProduct: SoldProduct) => void
    reset: () => void
    remove: (index: number) => void
}

const defaultContextValue: CartContextType = {
    products: [],
    addProduct: () => {},
    reset: () => {},
    remove: () => {}

}

export const CartContext = createContext<CartContextType>(defaultContextValue);

export function CartProvider({ children } : { children: ReactNode }) {
    const [products, setProducts] = useState<SoldProduct[]>([])

    function addProduct(newProduct: SoldProduct) {
        setProducts((oldProducts) => {
            return [...oldProducts, newProduct]
        })
    }

    function reset() {
        setProducts([])
    }

    function remove(index: number) {
        setProducts((oldProducts) => {
            return oldProducts.splice(index, 1)
        })
    }

    return (
        <CartContext.Provider value={{ products, addProduct, reset, remove }}>
            { children }
        </CartContext.Provider>
    )
}