import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/Utils/Hooks/UseAuth";
import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function Login() {
	const {isAuthenticated, signIn} = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function handleSignIn() {
		await signIn({
			username,
			password,
		});
	}

	return isAuthenticated ? (
		<Navigate to="/" />
	) : (
		<div className="bg-slate-50 text-dark-900 h-screen flex items-center">
			<div className="w-64 mx-auto p-6 rounded-lg bg-slate-200">
				<h1 className="text-lg font-bold pb-8">Login</h1>
				<div className="grid gap-1">
					<div>
						<span>Usuário</span>
						<Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</div>
					<div>
						<span>Senha</span>
						<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<Button variant="filled" className="mt-4" onClick={handleSignIn}>
						ENTRAR
					</Button>
				</div>
			</div>
		</div>
	);
}
