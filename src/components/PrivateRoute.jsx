import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  try {
    const raw = localStorage.getItem("user");

    if (!raw || raw === "undefined" || raw === "null" || raw === "") {
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(raw);

    // ✅ Valida por usuarioId ya que el backend no devuelve token aún
    if (!user || !user.usuarioId) {
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }

    return children;

  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;