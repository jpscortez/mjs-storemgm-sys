import { Button } from "@/components/ui/button";
import NavBarItem from "./NavBarItem";
import { UserContext } from "@/Utils/UserProvider";
import { useContext } from "react";

export default function NavBar() {
  const { logout } = useContext(UserContext)
  return (
    <nav className="bg-slate-900 h-16 px-4 flex justify-between items-center">
      <div className="w-12">LOGO</div>
      <div className="flex flex-row gap-4">
        <NavBarItem caption="Início" to="/" />
        <NavBarItem caption="Produtos" to="/products" />
        <NavBarItem caption="Venda" to="/sell" />
      </div>
      <div>
        <Button className="w-12" variant="ghost" onClick={logout}>logout</Button>
      </div>
    </nav>
  )
}