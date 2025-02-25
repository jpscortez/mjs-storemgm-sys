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
];
