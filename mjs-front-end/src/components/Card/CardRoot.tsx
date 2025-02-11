import { ReactNode } from "react"

type CardRootProps = {
    children?: ReactNode
}

export function CardRoot({ children }: CardRootProps) {
    return (
        <div className="my-6 p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300 grid gap-4">
            {children}
        </div>
    )
}