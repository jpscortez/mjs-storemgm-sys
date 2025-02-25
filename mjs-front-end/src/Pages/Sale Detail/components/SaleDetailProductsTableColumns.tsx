import {SoldProductSaleDetail} from "@/Models/SaleDetail";
import {formatPrice} from "@/Utils/Functions/parser";
import {ColumnDef} from "@tanstack/react-table";

export const columns: ColumnDef<SoldProductSaleDetail>[] = [
	{
		accessorKey: "name",
		header: "Descrição",
	},
	{
		accessorKey: "price",
		header: "Preço UN",
		cell: ({row}) => {
			const price = parseFloat(row.getValue("price"));
			return <div>{formatPrice(price)}</div>;
		},
	},
	{
		accessorKey: "numItems",
		header: "qtde",
	},
	{
		accessorKey: "discount",
		header: "Desconto",
		cell: () => <div>{formatPrice(0)}</div>,
	},
	{
		accessorKey: "totalPaid",
		header: "preço",
		cell: ({row}) => {
			const totalPaid = parseFloat(row.getValue("totalPaid"));
			return <div>{formatPrice(totalPaid)}</div>;
		},
	},
];
