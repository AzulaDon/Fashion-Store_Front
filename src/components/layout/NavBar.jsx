import { useState } from "react";
import { Link } from "react-router-dom";
import useScrolled from "../../hooks/useScrolled";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { getUser } from "../../services/api";

const user = getUser();
const isAdmin = user?.rol === "ADMIN";

const Navbar = () => {
    const scrolled = useScrolled(80)
    const [open, setOpen] = useState(false);

    const links = [
        { to: "/inicio", label: "INICIO"},
        { to: "/colecciones", label: "COLECCIONES" },
        { to: "/novedades", label: "NOVEDADES"},
        { to: "/ofertas", label: "OFERTAS"},
        { to: "/select-gender", label: "VOLVER A LOS GENEROS"},
        (isAdmin ? [{ to: "/admin", label: "ADMINISTRAR" }] : [])
    ];

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
                            <Link to={to} onClick={() => setOpen(false)}>{label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <button className="icon-btn" aria-label="Search">
                        <CiSearch className="icon"/>
                    </button>

                    <button className="icon-btn cart">
                        <CiShoppingCart className="icon" />
                        <span className="badge">2</span>
                    </button>

                    <button className="icon-btn" aria-label="Account">
                        <CiUser className="icon"/>
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