import {Skeleton} from "@/components/ui/skeleton";
import {OpenAccountDashboardDTO} from "@/Models/OpenAccountDashboardDTO";
import {getDashboardOpenAccounts} from "@/services/dashboard";
import {joinWithMaxLength} from "@/Utils/Functions/joinWithMaxLenght";
import {formatPrice} from "@/Utils/Functions/parser";
import {useQuery} from "@tanstack/react-query";
import {Users} from "lucide-react";
import {useNavigate} from "react-router-dom";

export function ClientOpenAccountsListCard() {
	const navigate = useNavigate();

	function navigateToSellDetail(openAccount: OpenAccountDashboardDTO) {
		navigate(`/open-accounts/settle/${openAccount.customerCode}`);
	}

	const {data: accounts, isLoading} = useQuery({
		queryKey: ["dashboard", "openAccounts"],
		queryFn: getDashboardOpenAccounts,
	});

	return (
		<section className="col-span-2 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<Users />
				<h3>Contas em aberto</h3>
			</div>
			<div className="h-full">
				{isLoading ? (
					<div className="flex items-center space-x-4">
						<Skeleton className="h-12 w-12 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
				) : accounts!.length > 0 ? (
					<div className="text-sm h-full overflow-auto">
						{accounts!.map((u, i) => (
							<div className="grid group" key={i}>
								<ul
									className="inline-flex justify-between w-full py-2 hover:cursor-pointer hover:bg-slate-100"
									onDoubleClick={() => navigateToSellDetail(u)}
								>
									<div>{joinWithMaxLength([u.name], 30)}</div>
									<span className="ml-auto">{formatPrice(u.total)}</span>
								</ul>

								<div className="w-full border-b group-last:hidden" />
							</div>
						))}
					</div>
				) : (
					<div className="flex h-4/6 items-center justify-center text-xs">
						<span>Não há contas em aberto</span>
					</div>
				)}
			</div>
		</section>
	);
}
