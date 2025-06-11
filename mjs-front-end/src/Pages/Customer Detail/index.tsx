import Page from "@/components/Page";
import MyCard from "@/components/Card";
import {Edit, House, IdCard, LoaderCircle, Phone, User} from "lucide-react";
import {Navigate, useParams} from "react-router-dom";
import {getCustomerByCode} from "@/services/customers";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useQuery} from "@tanstack/react-query";
import {nameInitials} from "@/Utils/Functions/nameInitials";
import CustomerPurchasesTable from "./components/CustomerPurchasesTable";
import {format} from "date-fns";
import EditCustomerCompements from "./components/EditCustomerComplements";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export default function CustomerDetailPage() {
	const {customerCode} = useParams();
	const [editMode, setEditMode] = useState(false);
	const [save, setSave] = useState(false);

	const {
		data: customerDetail,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["customers", customerCode],
		queryFn: () => getCustomerByCode(parseInt(customerCode!)),
		enabled: !!customerCode,
	});

	if (!customerCode || error) {
		return <Navigate to="/" replace />;
	}

	if (isLoading) {
		return <LoaderCircle />;
	}

	const onSaveClicked = () => {
		setSave(true);
	};

	const onEditClicked = () => {
		setSave(false);
		setEditMode(true);
	};

	const closeEditMode = () => {
		setEditMode(false);
		refetch();
	};

	return (
		<Page backUri="/customers">
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title title={customerDetail!.name} icon={User} />
					<MyCard.Actions>
						{editMode ? (
							<Button onClick={onSaveClicked}>Save</Button>
						) : (
							<>
								{customerDetail!.missingComplements && (
									<span className="text-red-400 rounded bg-red-100 px-2 py-1">
										{" "}
										Complete o cadastro →
									</span>
								)}
								<Button size="icon" onClick={onEditClicked}>
									<Edit />
								</Button>
							</>
						)}
					</MyCard.Actions>
				</MyCard.Header>
				<MyCard.Content>
					<div className="grid grid-cols-2">
						<div>
							<Avatar className="size-32 text-4xl">
								<AvatarFallback>{nameInitials(customerDetail!.name)}</AvatarFallback>
							</Avatar>
							<div className="pt-4">
								<p>Cliente desde {format(customerDetail!.curtomerSince, "dd/MM/yyyy")}</p>
							</div>
						</div>
						{editMode ? (
							<EditCustomerCompements
								code={customerDetail!.code}
								phoneNumber={customerDetail!.phoneNumber}
								address={customerDetail!.address}
								identification={customerDetail!.identification}
								save={save}
								closeEditMode={closeEditMode}
							/>
						) : (
							<div className="grid items-end">
								<div>
									<p>
										<i>
											<Phone /> {customerDetail!.phoneNumber ?? "-"}
										</i>
									</p>
								</div>
								<div>
									<p>
										<House />
										<i>{customerDetail!.address ?? "-"}</i>
									</p>
								</div>
								<div>
									<p>
										<IdCard />
										<i>{customerDetail!.identification ?? "-"}</i>
									</p>
								</div>
							</div>
						)}
					</div>
					<div>
						<h3 className="pt-8 pb-2 uppercase">
							<b>Últimas compras</b>
						</h3>
						<CustomerPurchasesTable purchases={customerDetail!.purchases} />
					</div>
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
