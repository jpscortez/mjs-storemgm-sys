import {CustomerSummaryDTO} from "@/Models/CustomerSummaryDTO";
import {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<CustomerSummaryDTO>[] = [
	{
		accessorKey: "code",
		header: "#",
	},
	{
		accessorKey: "name",
		header: "NOME",
	},
	{
		accessorKey: "numberOfPurchases",
		header: "COMPRAS",
	},
];
