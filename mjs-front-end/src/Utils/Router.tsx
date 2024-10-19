import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home";
import ProductsPage from "../Pages/Products";
import Login from "../Pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import App from "../App";
import SellPage from "@/Pages/Sell";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />

        <Route element={<ProtectedRoutes />}>
          <Route element={<App />}>
            <Route element={<HomePage />} path="/" />
            <Route element={<ProductsPage />} path="/products" />
            <Route element={<SellPage />} path="/sell" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}