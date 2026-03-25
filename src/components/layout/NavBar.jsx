import { useState } from "react";
import { Link } from "react-router-dom";
import useScrolled from "../../hooks/useScrolled";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
    const scrolled = useScrolled(80)
    const [open, setOpen] = useState(false);

    const links = [
        { to: "/colecciones", label: "COLECCIONES" },
        { to: "/dama", label: "DAMA"},
        { to: "/caballero", label: "CABALLERO"},
    ];

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-inner">

                <Link to="/" className="navbar-logo">
                    <span>SILHOUETTE</span>
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
                        <CiSearch />
                    </button>

                    <button className="icon-btn" aria-label="Cart">
                        <CiShoppingCart/>
                    </button>

                    <button className="icon-btn" aria-label="Account">
                        <CiUser />
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