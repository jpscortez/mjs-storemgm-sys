import {useContext} from "react";
import {NewSaleContext} from "./NewSaleProvider";

export function useNewSale() {
	const context = useContext(NewSaleContext);
	if (!context) {
		throw new Error("useNewSale must be used within a NewSaleProvider");
	}

	return context;
}
