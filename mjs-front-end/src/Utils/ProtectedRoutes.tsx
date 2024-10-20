import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { useContext } from "react";

export default function ProtectedRoutes() {
  const { isLoggedIn } = useContext(UserContext)

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}