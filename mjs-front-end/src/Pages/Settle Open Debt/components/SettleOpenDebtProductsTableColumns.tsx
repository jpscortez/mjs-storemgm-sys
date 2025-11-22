import {ProductsOpenDebtDTO} from "@/Models/OpenDebtDTO";
import {formatDate} from "@/Utils/Functions/parser";
import {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<ProductsOpenDebtDTO>[] = [
	{
		accessorKey: "timestamp",
		header: "Data",
		cell: ({row}) => {
			const date = new Date(row.getValue("timestamp"));

			return formatDate(date, true);
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
