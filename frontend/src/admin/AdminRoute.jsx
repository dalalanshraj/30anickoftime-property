import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // NOT LOGGED IN
  if (!token || !user) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // NOT ADMIN
  if (
    user.role !== "admin" &&
    user.role !== "superadmin"
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;