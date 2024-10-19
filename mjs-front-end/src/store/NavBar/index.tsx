import NavBarItem from "./NavBarItem";

export default function NavBar() {
  return (
    <nav className="bg-slate-900 h-16 flex flex-row justify-center gap-4">
      <NavBarItem caption="Início" to="/" />
      <NavBarItem caption="Produtos" to="/products" />
      <NavBarItem caption="Venda" to="/sell" />
    </nav>
  )
}