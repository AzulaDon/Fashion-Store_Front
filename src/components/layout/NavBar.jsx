import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { getUser } from "../../services/api";
import useCart from "../../hooks/useCart";
import useScrolled from "../../hooks/useScrolled";

const Navbar = () => {
    const scrolled = useScrolled(80);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { totalItems } = useCart();

    const user = getUser();
    const isAdmin = user?.rolId === 1;

    const links = [
        { to: "/colecciones",    label: "COLECCIONES" },
        { to: "/novedades",      label: "NOVEDADES" },
        { to: "/ofertas",        label: "OFERTAS" },
        { to: "/select-gender",  label: "VOLVER A LOS GÉNEROS" },
        ...(isAdmin ? [{ to: "/admin", label: "ADMINISTRAR" }] : []),
    ];

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("gender");
        navigate("/login");
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-inner">

                <Link to="/" className="navbar-logo">
                    <span className="logo-mark">S</span>
                    <span className="logo-text">
                        SILHOUETTE<em>UX</em>
                    </span>
                </Link>

                <ul className={`navbar-links ${open ? "open" : ""}`}>
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} onClick={() => setOpen(false)}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <button className="icon-btn" aria-label="Search">
                        <CiSearch className="icon" />
                    </button>

                    <button className="icon-btn cart" onClick={() => navigate("/cart")}>
                        <CiShoppingCart className="icon" />
                        {totalItems > 0 && (<span className="cart-badge">{totalItems}</span>)}
                    </button>

                    <button
                        className="icon-btn"
                        aria-label="Account"
                        onClick={handleLogout}
                        title="Cerrar sesión"
                    >
                        <CiUser className="icon" />
                    </button>

                    <button
                        className={`navbar-hamburger ${open ? "open" : ""}`}
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;