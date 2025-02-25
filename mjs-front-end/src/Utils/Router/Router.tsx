import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import NewSalePage from "@/Pages/New Sale";
import Login from "@/Pages/Login";
import App from "@/App";
import HomePage from "@/Pages/Home";
import ProductsPage from "@/Pages/Products";
import AllSalesPage from "@/Pages/All Sales";
import SaleDetailPage from "@/Pages/Sale Detail";
import TestPage from "@/Pages/Test";
import CustomersPage from "@/Pages/Customers";
import CustomerDetailPage from "@/Pages/Customer Detail";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Login />} path="/login" />

				<Route element={<ProtectedRoutes />}>
					<Route element={<App />}>
						<Route element={<HomePage />} path="/" />
						<Route element={<ProductsPage />} path="/products" />
						<Route element={<TestPage />} path="/test" />
						<Route element={<AllSalesPage />} path="/sales" />
						<Route element={<SaleDetailPage />} path="/sales/:saleId" />
						<Route element={<NewSalePage />} path="/new-sale" />
						<Route element={<CustomersPage />} path="/customers" />
						<Route element={<CustomerDetailPage />} path="/customers/:customerCode" />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
