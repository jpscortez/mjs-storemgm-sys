import CartConfirmButton from "./CartConfirmButton";
import CartInputs from "./CartInputs";
import CartProductTable from "./CartProductTable";
import CartTotal from "./CartTotal";

export function Cart() {
	return (
		<div>
			<CartInputs />
			<CartProductTable />
			<CartTotal />
			<CartConfirmButton />
		</div>
	);
}
