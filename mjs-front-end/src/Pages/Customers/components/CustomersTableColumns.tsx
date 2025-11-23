import {CustomerRegisterStatus, CustomerSummaryDTO} from "@/Models/CustomerSummaryDTO";
import {ColumnDef} from "@tanstack/react-table";
import {House, IdCard, Phone} from "lucide-react";

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
		accessorKey: "status",
		header: "",
		cell: ({row}) => {
			const data = row.getValue("status") as CustomerRegisterStatus;
			console.log(data);
			const {phoneNumber, address, identification} = data;
			return (
				<div className="flex flex-row gap-2">
					<House className={` ${address ? "text-green-500" : "text-yellow-500"}`} />
					<IdCard className={` ${identification ? "text-green-500" : "text-yellow-500"}`} />
					<Phone className={` ${phoneNumber ? "text-green-500" : "text-yellow-500"}`} />
				</div>
			);
		},
		size: 10,
	},
];
