import { SoldProduct } from "@/Models/Product";
import DataTable from "@/components/DataTable";
import { parsePrice } from "@/Utils/Functions/parser";
import { ColumnDef } from "@tanstack/react-table";
import { useCart } from "../useCart";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const columns: ColumnDef<SoldProduct>[] = [
    {
        accessorKey: "i",
        header: "#",
        cell: ({ row }) => {
            return (<div>{row.index + 1}</div>)
        }
    },
    {
        accessorKey: "code",
        header: "code",
    },
    {
        accessorKey: "name",
        header: "Produto",
    },
    {
        accessorKey: "price",
        header: "Preço UN",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            return (<div>{parsePrice(price)}</div>)
        }
    },
    {
        accessorKey: "amount",
        header: "qtde"
    },
    {
        accessorKey: "price",
        header: "preço",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const amount = parseFloat(row.getValue("amount"))
            return (<div>{parsePrice(price * amount)}</div>)
        }
    },
]

function comlumnsWithActions(removeFn: (index: number) => void) {
    const actionColumn: ColumnDef<SoldProduct> = {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="inline-flex items-end">
                    <Button size="icon" className="text-red-500 hover:bg-red-500/10" onClick={() => removeFn(row.index)}>
                        <Trash />
                    </Button>
                </div>
            );
        }
    }

    return [...columns, actionColumn]
}

export default function CartProductTable() {
    const { products, remove } = useCart()

    return (
        <DataTable
            columns={comlumnsWithActions(remove)}
            data={products}
            onRowDblClick={(r) => console.log(r)}
            className="h-64"
        />
    )
}