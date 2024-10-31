import { SoldProduct } from "@/Models/Product";
import DataTable from "@/store/DataTable";
import { parsePrice } from "@/Utils/Functions/parser";
import { ColumnDef } from "@tanstack/react-table";

interface SellProductsTableProps {
    products: SoldProduct[]
}

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

export default function SellProductTable({ products }: SellProductsTableProps) {
    return (
        <DataTable
            columns={columns}
            data={products}
            onRowDblClick={(r) => console.log(r)}
            className="h-64"
        />
    )
}