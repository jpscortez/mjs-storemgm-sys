
import { ReactNode } from "react"


type CardHeaderProps = {
    children: ReactNode
}

export function CardHeader({ children }: CardHeaderProps) {
    return (
        <div className="h-6 inline-flex justify-between">
            {children}
        </div>
    )

}