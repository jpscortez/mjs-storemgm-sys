export type CustomerSummaryDTO = {
	code: number;
	name: string;
	status: CustomerRegisterStatus;
};

export type CustomerRegisterStatus = {
	phoneNumber: boolean;
	address: boolean;
	identification: boolean;
};
