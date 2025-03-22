export type SaleSummaryDTO = {
	code: number;
	customerName: string;
	totalPaid: number;
	numItems: number;
	timestamp: Date;
	productNames: string[];
	isOpen: boolean;
};
