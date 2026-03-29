import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };
  return (
    <div className="admin-sidebar">

      <div className="sidebar-logo">
        <span>S</span>
        <h2>ADMIN</h2>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/admin/productos" className="sidebar-item">
          <span className="sidebar-icon">📦</span>
          Productos
        </NavLink>

        <NavLink to="/admin/usuarios" className="sidebar-item">
          <span className="sidebar-icon">👤</span>
          Usuarios
        </NavLink>

        <NavLink to="/admin/ventas" className="sidebar-item">
          <span className="sidebar-icon">💰</span>
          Ventas
        </NavLink>

      </nav>

      <div className="sidebar-footer" onClick={handleLogout}>
        <button>Cerrar sesión</button>
      </div>

    </div>
  );
};

export default Sidebar;