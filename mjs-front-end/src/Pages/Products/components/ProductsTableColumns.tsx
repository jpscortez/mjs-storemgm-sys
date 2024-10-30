import { Product } from "@/Models/Product";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "code",
        header: "#",
    },
    {
        accessorKey: "name",
        header: "Produto",
    },
    {
        accessorKey: "category",
        header: "categoria",
    },
    {
        accessorKey: "price",
        header: "Preço (R$)",
    },
]