// ✅ fix — usa rolId === 1
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/api";
import AdminDashboard from "./AdminDashboard";

const Admin = () => {
  const user = getUser();

  if (!user || user.rolId !== 1) {
    return <Navigate to="/" replace />;
  }

  return (
      <div className="page">
        <AdminDashboard />
      </div>
  );
};

export default Admin;