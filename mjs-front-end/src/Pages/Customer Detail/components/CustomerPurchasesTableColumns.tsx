import {CustomerDetailPurchasesDTO} from "@/Models/CustomerDetailDTO";
import {formatPrice} from "@/Utils/Functions/parser";
import {ColumnDef} from "@tanstack/react-table";
import {format} from "date-fns";

export const columns: ColumnDef<CustomerDetailPurchasesDTO>[] = [
	{
		accessorKey: "timestamp",
		header: "Data",
		cell: ({row}) => {
			const date = new Date(row.getValue("timestamp"));

			return format(date, "dd/MM/yyy 'às' H:mm");
		},
	},
	{
		accessorKey: "numItems",
		header: "QTDE",
	},
	{
		accessorKey: "totalPaid",
		header: "Total pago",
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
