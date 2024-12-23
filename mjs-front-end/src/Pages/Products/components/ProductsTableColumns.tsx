import { Product } from "@/Models/Product";
import { ColumnDef } from "@tanstack/react-table";
import { EditProductDialog } from "./EditProductDialog";
import { parsePrice } from "@/Utils/Functions/parser";
import { RemoveProductDialog } from "./RemoveProductDialog";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "code",
        header: "#",
    },
    {
        accessorKey: "description",
        header: "Produto",
    },
    {
        accessorKey: "stockUnits",
        header: "em estoque",
    },
    {
        accessorKey: "sellPrice",
        header: () => <div className="text-right">Preço</div>,
        cell: ({ row }) => {
            const sellPrice = parseFloat(row.getValue("sellPrice"))
            const formatted = parsePrice(sellPrice)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="inline-flex items-end">
                    <EditProductDialog product={row.original} />
                    <RemoveProductDialog />
                </div>
            );
        }
    }
]