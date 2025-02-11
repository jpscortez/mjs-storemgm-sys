import { ReactNode } from "react"

type CardActionsProps = {
    children: ReactNode
}

export function CardActions({children}: CardActionsProps) {
    return (
        <div className="flex gap-2  items-center overflow-visible">
            {children}
        </div>
    )
}