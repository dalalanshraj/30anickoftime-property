import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  console.log("TOKEN:", token);
  console.log("USER:", user);

  return children;
};

export default AdminRoute;