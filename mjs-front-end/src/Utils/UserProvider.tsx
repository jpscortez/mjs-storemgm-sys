import { createContext, ReactNode, useState } from "react";

interface UserContextProps {
    user: boolean;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function login() {
        setUser(true)
        setIsLoggedIn(true)
    }

    function logout() {
        setUser(false)
        setIsLoggedIn(false)
    }

    return (
        <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}
