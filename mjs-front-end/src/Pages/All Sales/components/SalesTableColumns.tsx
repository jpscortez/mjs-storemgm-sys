import { format } from "date-fns"
import { Sale } from "@/Models/Sale";
import { ColumnDef } from "@tanstack/react-table";
import { joinWithMaxLength } from "@/Utils/Functions/joinWithMaxLenght";
import { parsePrice } from "@/Utils/Functions/parser";

export const columns: ColumnDef<Sale>[] = [
    {
        accessorKey: "timestamp",
        header: "Data",
        cell: ({ row }) => {
            const date = new Date(row.getValue("timestamp"))

            return format(date, "dd/MM/yyy h:mm")
        },
    },
    {
        accessorKey: "productNames",
        header: "Produtos",
        cell: ({ row }) => {
            const productNames: string[] = row.getValue("productNames")

            return joinWithMaxLength(productNames, 50)
        },
    },
    {
        accessorKey: "numItems",
        header: "Qtde",
    },
    {
        accessorKey: "totalPaid",
        header: "Total",
        cell: ({ row }) => {
            const totalPaid = parseFloat(row.getValue("totalPaid"))
            return parsePrice(totalPaid)
        }
    },
    // {
    //     accessorKey: "sellPrice",
    //     header: () => <div className="text-right">Preço</div>,
    //     cell: ({ row }) => {
    //         const sellPrice = parseFloat(row.getValue("sellPrice"))
    //         const formatted = parsePrice(sellPrice)

    //         return <div className="text-right font-medium">{formatted}</div>
    //     },
    // }
]