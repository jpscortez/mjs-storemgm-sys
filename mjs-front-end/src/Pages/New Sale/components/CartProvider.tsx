import { SoldProduct } from "@/Models/Product";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartContextType {
    products: SoldProduct[]
    addProduct: (newProduct: SoldProduct) => void
    reset: () => void
    remove: (index: number) => void
    isEmpty: boolean
}

const defaultContextValue: CartContextType = {
    products: [],
    addProduct: () => {},
    reset: () => {},
    remove: () => {},
    isEmpty: true

}

export const CartContext = createContext<CartContextType>(defaultContextValue);

export function CartProvider({ children } : { children: ReactNode }) {
    const [products, setProducts] = useState<SoldProduct[]>([])
    const [isEmpty, setIsEmpty] = useState(false)

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

    useEffect(() => {
        setIsEmpty(products.length == 0)
    }, [setIsEmpty, products])

    return (
        <CartContext.Provider value={{ products, addProduct, reset, remove, isEmpty }}>
            { children }
        </CartContext.Provider>
    )
}