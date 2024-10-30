import { createContext, ReactNode, useState } from "react";

interface AuthContextProps {
    user: boolean;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(localStorage.getItem("user") && true || false)
    const [isLoggedIn, setIsLoggedIn] = useState(user)

    function login() {
        localStorage.setItem("user", "user")
        setUser(true)
        setIsLoggedIn(true)
    }

    function logout() {
        localStorage.removeItem("user")
        setUser(false)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
