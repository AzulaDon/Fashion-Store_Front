import { useState } from "react";
import logo from "../logo.svg";
import "../styles/pages/_Signup.scss";
import { login, register } from "../services/api";

// ── Fondos animados ─────────────────────────────────────────────────────────
const CardBackground = ({ view }) => (
    <>
        <div className={`card-bg card-bg-1 ${view}`} />
        <div className={`card-bg card-bg-2 ${view}`} />
    </>
);

// ── Formulario Login ────────────────────────────────────────────────────────
const LoginForm = ({ view, toggleView }) => {
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleLogin = async () => {
        if (!email || !password) { setError("Completa todos los campos."); return; }
        setError(""); setLoading(true);
        try {
            const data = await login(email, password);
            console.log("Login exitoso:", data);
            // TODO: redirigir al home o guardar usuario en contexto
            window.location.href = "/";
        } catch (err) {
            setError(err.message || "Credenciales incorrectas.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`form form-login ${view === "login" ? "active" : ""}`}>
            <form>
                <p className="form-eyebrow">Bienvenida de vuelta</p>
                <h2 className="form-title">Iniciar<br />sesión</h2>
                {error && <p className="form-error">{error}</p>}
                <div className="field">
                    <input
                        type="email" placeholder="Correo electrónico"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        type="password" placeholder="Contraseña"
                        value={password} onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleLogin()}
                    />
                </div>
                <button type="button" className="btn-submit" onClick={handleLogin} disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
                <p className="form-switch">
                    ¿No tienes cuenta? <span onClick={toggleView}>Regístrate</span>
                </p>
            </form>
        </div>
    );
};

// ── Formulario Register ─────────────────────────────────────────────────────
const RegisterForm = ({ view, toggleView }) => {
    const [nombre, setNombre]     = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleRegister = async () => {
        if (!nombre || !email || !password) { setError("Completa todos los campos."); return; }
        if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
        setError(""); setLoading(true);
        try {
            const data = await register(nombre, email, password);
            console.log("Registro exitoso:", data);
            // TODO: redirigir o mostrar mensaje de bienvenida
            window.location.href = "/";
        } catch (err) {
            setError(err.message || "Error al registrarse. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`form form-register ${view === "register" ? "active" : ""}`}>
            <form>
                <p className="form-eyebrow">Únete a nosotras</p>
                <h2 className="form-title">Crear<br />cuenta</h2>
                {error && <p className="form-error">{error}</p>}
                <div className="field">
                    <input
                        type="text" placeholder="Nombre completo"
                        value={nombre} onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        type="email" placeholder="Correo electrónico"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        type="password" placeholder="Contraseña"
                        value={password} onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleRegister()}
                    />
                </div>
                <button type="button" className="btn-submit" onClick={handleRegister} disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
                <p className="form-switch">
                    ¿Ya tienes cuenta? <span onClick={toggleView}>Inicia sesión</span>
                </p>
            </form>
        </div>
    );
};

// ── Panel decorativo ────────────────────────────────────────────────────────
const DecorPanel = ({ view, toggleView }) => {
    const isLogin = view === "login";
    return (
        <div className={`decor-panel ${isLogin ? "decor-right" : "decor-left"}`}>
            <div className="decor-inner">
                <img className="decor-logo" src={logo} alt="logo" />
                <div>
                    <div className="decor-line" />
                    <p className="decor-label">{isLogin ? "Colección 2025" : "Moda · Estilo · Elegancia"}</p>
                    <p className="decor-tagline">
                        {isLogin ? <>Descubre piezas<br />únicas para ti.</> : <>Tu guardarropa,<br />perfectamente curado.</>}
                    </p>
                </div>
                <button type="button" className="btn-ghost" onClick={toggleView}>
                    {isLogin ? "Crear cuenta" : "Iniciar sesión"}
                </button>
            </div>
        </div>
    );
};

// ── Componente principal ────────────────────────────────────────────────────
export const Signup = () => {
    const [view, setView] = useState("login");
    const toggleView = () => setView(v => v === "login" ? "register" : "login");

    return (
        <div className="signup-wrapper">
            <div className="card">
                <CardBackground view={view} />
                <LoginForm    view={view} toggleView={toggleView} />
                <RegisterForm view={view} toggleView={toggleView} />
                <DecorPanel   view={view} toggleView={toggleView} />
            </div>
        </div>
    );
};

export default Signup;