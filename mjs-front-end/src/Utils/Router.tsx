import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Login from "../Pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import App from "../App";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Login />} path="/login" />

          <Route element={<ProtectedRoutes />}>
            <Route element={<App />}>
              <Route element={<Home/>} path="/" />
              <Route element={<Products/>} path="/Products" />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}