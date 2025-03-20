import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {twMerge} from "tailwind-merge";

interface DataTableProps<TData> {
	columns: ColumnDef<TData, TData[]>[];
	data: TData[];
	emptyDataMsg?: string;
	onRowDblClick?: (row: TData) => void;
	className?: string;
}

export default function DataTable<TData>({
	columns,
	data,
	emptyDataMsg = "No results.",
	onRowDblClick: onRowDblClickExternal,
	className,
}: DataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const onRowDblClick = (row: TData) => {
		if (onRowDblClickExternal) onRowDblClickExternal(row);
	};

	return (
		<div
			className={twMerge(
				"bg-white overflow-y-auto uppercase overflow-x-clip rounded-t-lg border inset-2 h-128",
				className
			)}
		>
			<Table className="relative">
				<TableHeader className="sticky top-0">
					{table.getHeaderGroups().map((headerGroup, i) => (
						<TableRow key={`${i}_${headerGroup.id}`}>
							{headerGroup.headers.map((header, j) => {
								return (
									<TableHead className="w-fit" key={`${j}_${header.id}`}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, i) => (
							<TableRow
								className="transition-colors hover:cursor-pointer"
								key={`${i}_${row.id}`}
								data-state={row.getIsSelected() && "selected"}
								onDoubleClick={() => onRowDblClick(row.original as TData)}
							>
								{row.getVisibleCells().map((cell, j) => (
									<TableCell className="w-fit" key={`${j}_${cell.id}`}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow className="h-32">
							<TableCell colSpan={columns.length} className="text-center">
								{emptyDataMsg}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
