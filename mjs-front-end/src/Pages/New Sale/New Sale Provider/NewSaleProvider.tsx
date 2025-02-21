import {PaymentMethodType} from "@/Models/PaymentMethod";
import {SoldProduct} from "@/Models/Product";
import {SaleDTO} from "@/Models/SaleDTO";
import {registerSale} from "@/services/sell";
import {useToast} from "@/Utils/Hooks/useToast";
import {useMutation} from "@tanstack/react-query";
import {createContext, ReactNode, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface NewSaleContextType {
	products: SoldProduct[];
	total: number;
	setProducts: (products: SoldProduct[]) => void;
	customer: string;
	setCustomer: (customer: string) => void;
	paymentMethod?: PaymentMethodType;
	setPaymentMethod: (paymentMethod: PaymentMethodType) => void;
	addProduct: (newProduct: SoldProduct) => void;
	remove: (index: number) => void;
	isCartReady: boolean;
	onRegisterSale: () => Promise<void>;
}

const defaultContextValue: NewSaleContextType = {
	products: [],
	total: 0,
	setProducts: () => {},
	customer: "",
	setCustomer: () => {},
	setPaymentMethod: () => {},
	addProduct: () => {},
	remove: () => {},
	isCartReady: false,
	onRegisterSale: async () => {},
};

export const NewSaleContext = createContext<NewSaleContextType>(defaultContextValue);

export function NewSaleProvider({children}: {children: ReactNode}) {
	const [products, setProducts] = useState<SoldProduct[]>([]);
	const [isCartReady, setIsCartReady] = useState(false);
	const [customer, setCustomer] = useState("");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();

	function addProduct(newProduct: SoldProduct) {
		setProducts((oldProducts) => {
			return [...oldProducts, newProduct];
		});
	}

	function remove(index: number) {
		setProducts((oldProducts) => {
			return oldProducts.splice(index, 1);
		});
	}

	useEffect(() => {
		setIsCartReady(products.length == 0);
	}, [setIsCartReady, products]);

	const {toast} = useToast();
	const navigate = useNavigate();

	const {mutateAsync: registerSaleFn} = useMutation({
		mutationFn: registerSale,
		onSuccess: ({code: newSaleCode}) => {
			navigate(`/sales/${newSaleCode}`);

			toast({
				variant: "default",
				description: "Venda Registrada!",
			});

			// reset();
		},
	});

	async function onRegisterSale() {
		const paymentMethodTypedFixed = paymentMethod ?? {type: PaymentMethodType.Cash};
		const sale: SaleDTO = products.reduce(
			(acc, {code, amount, discount, price}) => {
				const productTotal = amount * (price - discount);

				acc.totalPaid += productTotal;
				acc.numItems += amount;
				acc.products.push({code, numItems: amount, discount, price, valuePaid: productTotal});
				return acc;
			},
			{totalPaid: 0, products: [], numItems: 0, customer, paymentMethod: paymentMethodTypedFixed} as SaleDTO
		);

		console.log(sale);
		// await registerSaleFn(sale);
	}

	return (
		<NewSaleContext.Provider
			value={{
				products,
				setProducts,
				addProduct,
				remove,
				isCartReady,
				customer,
				setCustomer,
				paymentMethod,
				setPaymentMethod,
				onRegisterSale,
				total: products.reduce((total, p) => total + p.amount * p.price, 0),
			}}
		>
			{children}
		</NewSaleContext.Provider>
	);
}
