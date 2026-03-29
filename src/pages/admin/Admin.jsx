import { Navigate } from "react-router-dom";
import { getUser } from "../../services/api";
import AdminDashboard from "./AdminDashboard";

const Admin = () => {
  const user = getUser();

  if (!user || user.rol !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <AdminDashboard />;
};

export default Admin;