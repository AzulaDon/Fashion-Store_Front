import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import logo from "../logo.svg";
import "../styles/pages/_Signup.scss";
import { login, register } from "../services/api";


// ── Fondos ─────────────────────────
const CardBackground = ({ view }) => (
  <>
    <div className={`card-bg card-bg-1 ${view}`} />
    <div className={`card-bg card-bg-2 ${view}`} />
  </>
);

// ── LOGIN ─────────────────────────
const LoginForm = ({ view, toggleView }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError("Completa todos los campos."); return; }
    setError(""); setLoading(true);

    try {
      const data = await login(email, password);
      
      console.log("DATA recibida:", data);
      console.log("localStorage user después del login:", localStorage.getItem("user"));
      console.log("¿Tiene usuarioId?:", data?.usuarioId);

      navigate(!localStorage.getItem("gender") ? "/select-gender" : "/");

    } catch (err) {
      console.log("ERROR en login:", err);
      setError(err.message || "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`form form-login ${view === "login" ? "active" : ""}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <p className="form-eyebrow">Bienvenida de vuelta</p>
        <h2 className="form-title">Iniciar<br />sesión</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="field">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="form-switch">
          ¿No tienes cuenta? <span onClick={toggleView}>Regístrate</span>
        </p>
      </form>
    </div>
  );
};

// ── REGISTER ─────────────────────────
const RegisterForm = ({ view, toggleView }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [telefono, setTelefono] = useState("");

  const handleRegister = async () => {
    if (!email || !telefono || !password) {
      setError("Completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await register(email, password, telefono);

      console.log("Registro exitoso:", data);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      if (!localStorage.getItem("gender")) {
        navigate("/select-gender");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message || "Error al registrarse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`form form-register ${view === "register" ? "active" : ""}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <p className="form-eyebrow">Únete a nosotras</p>
        <h2 className="form-title">Crear<br />cuenta</h2>

        {error && <p className="form-error">{error}</p>}        

        <div className="field">
            <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />
        </div>

        <div className="field">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="form-switch">
          ¿Ya tienes cuenta? <span onClick={toggleView}>Inicia sesión</span>
        </p>
      </form>
    </div>
  );
};

// ── PANEL DECORATIVO ─────────────────────────
const DecorPanel = ({ view, toggleView }) => {
  const isLogin = view === "login";

  return (
    <div className={`decor-panel ${isLogin ? "decor-right" : "decor-left"}`}>
      <div className="decor-inner">
        <img className="decor-logo" src={logo} alt="logo" />

        <div>
          <div className="decor-line" />
          <p className="decor-label">
            {isLogin ? "Colección 2025" : "Moda · Estilo · Elegancia"}
          </p>

          <p className="decor-tagline">
            {isLogin
              ? <>Descubre piezas<br />únicas para ti.</>
              : <>Tu guardarropa,<br />perfectamente curado.</>}
          </p>
        </div>

        <button type="button" className="btn-ghost" onClick={toggleView}>
          {isLogin ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </div>
    </div>
  );
};

// ── MAIN ─────────────────────────
export const Signup = () => {
  const [view, setView] = useState("login");

  const toggleView = () => {
    setView((v) => (v === "login" ? "register" : "login"));
  };

  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="signup-wrapper">
      <div className="card">
        <CardBackground view={view} />
        <LoginForm view={view} toggleView={toggleView} />
        <RegisterForm view={view} toggleView={toggleView} />
        <DecorPanel view={view} toggleView={toggleView} />
      </div>
    </div>
  );
};