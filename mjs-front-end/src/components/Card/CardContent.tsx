import { ReactNode } from "react"

type CardContentProps = {
    children?: ReactNode
}

export function CardContent({ children }: CardContentProps) {
    return (
        <div className="grid">
            {children}
        </div>
    )
}