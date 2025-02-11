import { Outlet } from "react-router-dom"
import SideBarRoot from "./components/SideBar"

function App() {

  return (
    <main className="relative container bg-white text-dark-800 flex flex-row flex-wrap">
      <SideBarRoot />

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </main>
  )
}

export default App
