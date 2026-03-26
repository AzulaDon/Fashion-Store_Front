import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2>ADMIN</h2>

      <nav>
        <Link to="/admin">Productos</Link>
        <Link to="/admin/usuarios">Usuarios</Link>
        <Link to="/admin/ventas">Ventas</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;