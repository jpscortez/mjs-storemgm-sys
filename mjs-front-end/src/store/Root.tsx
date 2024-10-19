import { ReactNode } from "react"
import NavBar from "./NavBar"

interface RootProps {
  children: ReactNode
}

export default function Root({ children }: RootProps) {
  return (
    <main className="bg-slate-800 text-slate-300 h-screen">
      <NavBar />
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  )
}