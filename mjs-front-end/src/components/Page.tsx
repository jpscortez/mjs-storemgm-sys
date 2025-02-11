import { ArrowLeft } from "lucide-react"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

type PageProps = {
    children: ReactNode
    backUri?: string
}

export default function Page({ children, backUri } : PageProps) {
    return (
        <div className="w-full">
            <div className="h-0">
                {
                    backUri &&
                    (
                        <Link to={backUri} className="overflow-visible">
                            <ArrowLeft />
                        </Link>
                    )
                }
            </div>
            { children }
        </div>
    )
}