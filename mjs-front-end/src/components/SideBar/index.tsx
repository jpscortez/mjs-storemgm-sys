import SideBarItem from "./SideBarItem";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/Utils/Hooks/UseAuth";
import {CircleDollarSign, Home, PackageOpen, ShoppingBag, Users} from "lucide-react";

export default function SideBarRoot() {
	const {logout} = useAuth();

	return (
		<aside className="sticky top-0 h-screen w-60 py-4 flex flex-col justify-between bg-slate-800 text-dark-50">
			<div>
				<h2 className="px-4 pb-2 border-b font-bold font-mono text-2xl border-b-dark-700">MJS Hidráulica</h2>

				<SideBarItem icon={Home} caption="Início" to="/" />
				<SideBarItem icon={PackageOpen} caption="Produtos" to="/products" />
				<SideBarItem icon={CircleDollarSign} caption="Minhas Vendas" to="/sales" end />
				<SideBarItem icon={ShoppingBag} caption="Nova Venda" to="/new-sale" />
				<SideBarItem icon={Users} caption="Clientes" to="/customers" />
			</div>

			<div>
				<Button className="w-12" variant="ghost" onClick={logout}>
					logout
				</Button>
			</div>
		</aside>
	);
}
