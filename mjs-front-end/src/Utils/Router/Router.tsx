import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import SellPage from "@/Pages/Sell";
import Login from "@/Pages/Login";
import App from "@/App";
import HomePage from "@/Pages/Home";
import ProductsPage from "@/Pages/Products";

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