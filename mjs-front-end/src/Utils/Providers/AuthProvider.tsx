import {createContext, ReactNode, useLayoutEffect, useState} from "react";
import {authenticate, signIn as signInRequest} from "@/services/auth";
import Cookies from "js-cookie";
import {User} from "@/Models/User";
import {apiClient} from "../apiClient";

type AuthContextProps = {
	user: User | null;
	isAuthenticated: boolean;
	signIn: (data: SignInProps) => Promise<void>;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type SignInProps = {
	username: string;
	password: string;
};

export function AuthProvider({children}: {children: ReactNode}) {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useLayoutEffect(() => {
		const token = Cookies.get("mjs.token");

		if (token) {
			authenticate().then((user) => {
				setUser(user);
				setIsAuthenticated(true);
			});
		}
	}, []);

	async function signIn({username, password}: SignInProps) {
		const {token, user} = await signInRequest({username, password});

		apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

		// Detecta se estamos em ambiente seguro (HTTPS) ou local
		const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

		Cookies.set("mjs.token", token, {
			expires: 1, // 1 dia de expiração
			secure: !isLocalhost, // apenas HTTPS em produção
			sameSite: "Strict",
			path: "/", // cookie acessível em toda a aplicação
		});

		setUser(user);
		setIsAuthenticated(true);
	}

	function logout() {
		apiClient.defaults.headers["Authorization"] = "";
		Cookies.remove("mjs.token");
		setUser(null);
		setIsAuthenticated(false);
	}

	return <AuthContext.Provider value={{user, signIn, logout, isAuthenticated}}>{children}</AuthContext.Provider>;
}
