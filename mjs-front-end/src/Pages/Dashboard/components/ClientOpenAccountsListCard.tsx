import {Skeleton} from "@/components/ui/skeleton";
import {getOpenAccounts} from "@/services/dashboard";
import {joinWithMaxLength} from "@/Utils/Functions/joinWithMaxLenght";
import {formatPrice} from "@/Utils/Functions/parser";
import {useQuery} from "@tanstack/react-query";
import {Users} from "lucide-react";

export function ClientOpenAccountsListCard() {
	const {data: accounts, isLoading} = useQuery({
		queryKey: ["dashboard", "openAccounts"],
		queryFn: getOpenAccounts,
	});

	return (
		<section className="col-span-2 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<Users />
				<h3>Contas em aberto</h3>
			</div>
			{isLoading ? (
				<div className="flex items-center space-x-4">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			) : (
				<div className="text-sm">
					{accounts!.map((u) => (
						<ul key={u.customerCode} className="inline-flex justify-between w-full py-2 border-b">
							<div>{joinWithMaxLength([u.name], 15)}</div>
							<span className="ml-auto">{formatPrice(u.total)}</span>
						</ul>
					))}
				</div>
			)}
		</section>
	);
}
