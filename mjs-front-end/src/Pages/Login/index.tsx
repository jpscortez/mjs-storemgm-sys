import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/Utils/Hooks/UseAuth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isLoggedIn, login } = useAuth()

  return isLoggedIn ?
    <Navigate to="/" /> :
    (
      <div className="bg-slate-800 text-dark-50 h-screen flex items-center">
        <div className="w-64 mx-auto p-6 rounded-lg bg-slate-700">
          <h1 className="text-lg font-bold pb-8">Login</h1>
          <div className="grid gap-1">
            <div>
              <span>Nome</span>
              <Input type="text" />
            </div>
            <div>
              <span>Senha</span>
              <Input type="password" />
            </div>
            <Button className="mt-4" onClick={login}>ENTRAR</Button>
          </div>
        </div>
      </div>
    )
}