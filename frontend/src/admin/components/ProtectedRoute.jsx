import { Navigate } from "react-router-dom";

console.log("ADMIN ROUTE LOADED");

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  console.log(
    "ADMIN ROUTE TOKEN:",
    token
  );

  return token ? (
    children
  ) : (
    <Navigate
      to="/admin/login"
      replace
    />
  );
};

export default AdminRoute;