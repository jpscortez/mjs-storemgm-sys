import {format} from "date-fns";
import {Sale} from "@/Models/Sale";
import {ColumnDef} from "@tanstack/react-table";
import {joinWithMaxLength} from "@/Utils/Functions/joinWithMaxLenght";
import {formatPrice} from "@/Utils/Functions/parser";

export const columns: ColumnDef<Sale>[] = [
	{
		accessorKey: "timestamp",
		header: "Data",
		cell: ({row}) => {
			const date = new Date(row.getValue("timestamp"));

			return format(date, "dd/MM/yyy HH:mm");
		},
	},
	{
		accessorKey: "productNames",
		header: "Produtos",
		cell: ({row}) => {
			const productNames: string[] = row.getValue("productNames");

			return joinWithMaxLength(productNames, 50);
		},
	},
	{
		accessorKey: "numItems",
		header: "Qtde",
	},
	{
		accessorKey: "totalPaid",
		header: "Total",
		cell: ({row}) => {
			const totalPaid = parseFloat(row.getValue("totalPaid"));
			return formatPrice(totalPaid);
		},
	},
	{
		accessorKey: "isOpen",
		header: "Status",
		cell: ({row}) => {
			const isOpen: boolean = row.getValue("isOpen");

			return isOpen ? (
				<span className="text-red-400 rounded bg-red-100 px-2 py-1">Não Pago</span>
			) : (
				<span className="text-green-400 rounded bg-green-100 px-2 py-1">Pago</span>
			);
		},
	},
];
