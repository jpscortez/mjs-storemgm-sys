import { LucideIcon } from "lucide-react"


type CardTitleProps = {
    title: string
    icon: LucideIcon
}

export function CardTitle({icon: Icon, title}: CardTitleProps) {
    return (
        <h3 className="inline-flex items-center gap-2 text-2xl">
            <Icon />
            <span>
            {title}
            </span>
        </h3>
    )
}