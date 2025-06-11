import {ProductsOpenAccountDTO} from "@/Models/OpenAccountDTO";
import {ColumnDef} from "@tanstack/react-table";
import {format} from "date-fns";

export const columns: ColumnDef<ProductsOpenAccountDTO>[] = [
	{
		accessorKey: "timestamp",
		header: "Data",
		cell: ({row}) => {
			const date = new Date(row.getValue("timestamp"));

			return format(date, "dd/MM/yyy HH:mm");
		},
	},
	{
		accessorKey: "name",
		header: "PRODUTO",
	},
	{
		accessorKey: "price",
		header: "Preço UN",
	},
	{
		accessorKey: "amount",
		header: "QTDE",
	},
	{
		accessorKey: "total",
		header: "Total",
	},
];
