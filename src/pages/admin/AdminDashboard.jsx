import Sidebar from "../../components/admin/Sidebar";
import AdminProductos from "./AdminProductos";

const AdminDashboard = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-content">
        <AdminProductos />
      </div>
    </div>
  );
};

export default AdminDashboard;