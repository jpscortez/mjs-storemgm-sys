import { useContext } from "react";
import { CartContext } from "./Cart/CartProvider";

export function useCart() {
    const context = useContext(CartContext)
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context
}