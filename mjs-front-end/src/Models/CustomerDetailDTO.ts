export type CustomerDetailDTO = {
	code: number;
	name: string;
	curtomerSince: Date;
	phoneNumber?: string;
	address?: string;
	identification?: string;
	missingComplements: boolean;
	purchases: CustomerDetailPurchasesDTO[];
};

export type CustomerDetailPurchasesDTO = {
	code: number;
	numItems: number;
	timestamp: Date;
	totalPaid: number;
};
