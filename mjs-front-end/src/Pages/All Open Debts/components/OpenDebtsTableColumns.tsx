import {Button} from "@/components/ui/button";
import {OpenDebtSummaryDTO} from "@/Models/OpenDebtSummaryDTO";
import {formatDate, formatPrice} from "@/Utils/Functions/parser";
import {ColumnDef} from "@tanstack/react-table";
import {Link} from "react-router-dom";

export const columns: ColumnDef<OpenDebtSummaryDTO>[] = [
	{
		accessorKey: "openSince",
		header: "ABERTURA",
		cell: ({row}) => {
			const date = new Date(row.getValue("openSince"));

			return formatDate(date);
		},
		size: 10,
	},
	{
		accessorKey: "name",
		header: "CLIENTE",
		size: 80,
	},
	{
		accessorKey: "total",
		header: "TOTAL",
		cell: ({row}) => {
			const total = parseFloat(row.getValue("total"));
			const formatted = formatPrice(total);

			return <div className="text-right font-medium">{formatted}</div>;
		},
		size: 10,
	},
	{
		accessorKey: "code",
		cell: ({row}) => {
			const code = row.getValue("code") as number;
			return (
				<Link className="bg-gree" to={`/open-debts/settle/${code}`}>
					<Button variant="success">Pagar</Button>
				</Link>
			);
		},
		size: 10,
	},
];
