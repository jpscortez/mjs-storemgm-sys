import NavBarItem from "./NavBarItem";

export default function NavBar() {
  return (
    <nav className="bg-slate-900 h-16 flex flex-row justify-center gap-4">
      <NavBarItem caption="Home" to="/" />
      <NavBarItem caption="Products" to="/products" />
    </nav>
  )
}