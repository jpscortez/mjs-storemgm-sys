import { Navigate } from "react-router-dom";

export default function Login() {
  const user = true;
  return user ? <Navigate to="/" /> : (
    <h1>Login</h1>
  )
}