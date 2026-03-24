import { useState, useEffect, useRef } from "react";
import "../styles/_Home.scss";
import { logout, getProductosPorCategoria } from "../services/api";

// ── Hook reveal al scroll ───────────────────────────────────────────────────
const useReveal = (threshold = 0.15) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

// ── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen]         = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = "/login";
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-inner">
                <a href="#" className="navbar-logo">
                    <span className="logo-mark">M</span>
                    <span className="logo-text">MAISON<em>LUX</em></span>
                </a>

                <ul className={`navbar-links ${open ? "open" : ""}`}>
                    {[["Colecciones","#categorias"],["Dama","#dama"],["Caballero","#caballero"],["Niños","#ninos"],["Contacto","#contacto"]].map(([label, href]) => (
                        <li key={label}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
                    ))}
                </ul>

                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                    <button className="navbar-cta" onClick={handleLogout}>Cerrar sesión</button>
                    <button className={`navbar-hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
                        <span/><span/><span/>
                    </button>
                </div>
            </div>
        </nav>
    );
};

// ── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => (
    <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
            <p className="eyebrow">Colección Primavera · 2025</p>
            <h1 className="serif-title">El arte de<br /><em>vestir bien.</em></h1>
            <p className="hero-subtitle">
                Piezas cuidadosamente seleccionadas para cada momento,<br />cada persona, cada historia.
            </p>
            <div className="hero-actions">
                <a href="#categorias" className="btn-solid">Explorar colección</a>
                <a href="#categorias" className="btn-ghost">Ver lookbook</a>
            </div>
        </div>
        <div className="hero-scroll"><span /><p>Desplaza</p></div>
    </section>
);

// ── Marquee strip ───────────────────────────────────────────────────────────
const Strip = () => {
    const items = ["Envío gratis en compras +$999","Nueva colección disponible","Devoluciones sin costo · 30 días","Materiales premium garantizados"];
    const all   = [...items, ...items];
    return (
        <div className="strip">
            <div className="strip-inner">
                {all.map((t, i) => <span key={i}>{t} &nbsp;·&nbsp;</span>)}
            </div>
        </div>
    );
};

// ── Patrones SVG ────────────────────────────────────────────────────────────
const Patterns = {
    circles: (accent) => (
        <svg viewBox="0 0 300 230" fill="none">
            {[120, 80, 40].map(r => <circle key={r} cx="150" cy="115" r={r} stroke={accent} strokeWidth="0.5" opacity="0.25" />)}
            <circle cx="240" cy="40" r="40" stroke={accent} strokeWidth="0.5" opacity="0.15" />
        </svg>
    ),
    lines: (accent) => (
        <svg viewBox="0 0 300 230" fill="none">
            {[0,1,2,3,4,5].map(i => <line key={i} x1={i*60-10} y1="0" x2={i*60+220} y2="230" stroke={accent} strokeWidth="0.5" opacity="0.18" />)}
            <rect x="40" y="30" width="220" height="170" stroke={accent} strokeWidth="0.5" opacity="0.18" />
        </svg>
    ),
    dots: (accent) => (
        <svg viewBox="0 0 300 230" fill="none">
            {[...Array(8)].map((_,r) => [...Array(9)].map((_,c) =>
                <circle key={`${r}-${c}`} cx={18+c*34} cy={16+r*28} r="1.5" fill={accent} opacity="0.22" />
            ))}
        </svg>
    ),
};

// ── Datos de categorías ─────────────────────────────────────────────────────
const CATS = [
    { id:"dama",      label:"Dama",      tag:"Colección Femenina",  accent:"#c9a96e", bg:"linear-gradient(160deg,#1a1208,#3d2a12)", pattern:"circles", desc:"Elegancia que se adapta a cada instante. Desde looks de oficina hasta outfits de noche.", items:["Vestidos","Blusas","Faldas","Accesorios"] },
    { id:"caballero", label:"Caballero", tag:"Colección Masculina", accent:"#8da8b8", bg:"linear-gradient(160deg,#0d1218,#1a2a38)", pattern:"lines",   desc:"Estilo sobrio y contemporáneo. Trajes, casualwear y accesorios de alta calidad.",       items:["Trajes","Camisas","Pantalones","Corbatas"] },
    { id:"ninos",     label:"Niños",     tag:"Colección Infantil",  accent:"#b8a88d", bg:"linear-gradient(160deg,#15120c,#2c2415)", pattern:"dots",    desc:"Comodidad y estilo para los más pequeños. Ropa que dura y que encanta.",               items:["Conjuntos","Vestidos","Casual","Escolar"] },
];

// ── Card de categoría con fetch al backend ───────────────────────────────────
const CatCard = ({ cat, index }) => {
    const [ref, visible]     = useReveal();
    const [productos, setProductos] = useState([]);

    // Al montar, carga los productos de esta categoría desde Spring Boot
    useEffect(() => {
        getProductosPorCategoria(cat.id)
            .then(data => setProductos(data))
            .catch(() => {}); // silencia si el endpoint aún no existe
    }, [cat.id]);

    return (
        <div
            ref={ref}
            id={cat.id}
            className={`cat-card ${visible ? "visible" : ""}`}
            style={{ "--accent": cat.accent, transitionDelay:`${index * 0.12}s` }}
        >
            <div className="cat-card-visual">
                <div className="cat-card-visual-bg" style={{ background: cat.bg }} />
                {Patterns[cat.pattern](cat.accent)}
                <div className="cat-card-visual-overlay" />
                <span className="cat-card-num">0{index + 1}</span>
            </div>
            <div className="cat-card-body">
                <p className="cat-card-tag">{cat.tag}</p>
                <h3 className="cat-card-title">{cat.label}</h3>
                <p className="cat-card-desc">{cat.desc}</p>
                <ul className="cat-card-tags">
                    {cat.items.map(i => <li key={i}>{i}</li>)}
                </ul>
                {/* Muestra conteo de productos si el back responde */}
                {productos.length > 0 && (
                    <p style={{ fontSize:"10px", color:"var(--accent)", letterSpacing:"0.1em", marginTop:4 }}>
                        {productos.length} piezas disponibles
                    </p>
                )}
                <a href="#" className="cat-card-link">
                    Ver colección
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5h9M7.5 3l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

// ── Sección categorías ──────────────────────────────────────────────────────
const Categories = () => {
    const [ref, visible] = useReveal();
    return (
        <section className="categories" id="categorias">
            <div ref={ref} className={`section-header reveal ${visible ? "visible" : ""}`}>
                <p className="eyebrow">Nuestras colecciones</p>
                <h2 className="serif-title">Moda para<br /><em>toda la familia</em></h2>
                <p className="section-sub">Tres universos de estilo, una sola boutique.</p>
            </div>
            <div className="cat-grid">
                {CATS.map((cat, i) => <CatCard key={cat.id} cat={cat} index={i} />)}
            </div>
        </section>
    );
};

// ── Highlights ──────────────────────────────────────────────────────────────
const Highlights = () => {
    const [ref, visible] = useReveal();
    const items = [
        { n:"01", title:"Selección curada",  desc:"Cada pieza pasa por un proceso de selección riguroso antes de llegar a ti." },
        { n:"02", title:"Tallas inclusivas", desc:"Ropa para todos los cuerpos. Porque el estilo no tiene restricciones." },
        { n:"03", title:"Envío express",     desc:"Recibe tu pedido en 24–48 hrs. Sin excusas, sin demoras." },
        { n:"04", title:"Asesoría personal", desc:"Nuestros estilistas te ayudan a armar el look perfecto para cada ocasión." },
    ];
    return (
        <section className="highlights">
            <div ref={ref} className={`highlights-inner ${visible ? "visible" : ""}`}>
                <div>
                    <p className="eyebrow">¿Por qué elegirnos?</p>
                    <h2 className="serif-title">Calidad que<br /><em>se siente.</em></h2>
                </div>
                <div className="highlights-grid">
                    {items.map(({ n, title, desc }) => (
                        <div key={n} className="highlights-item">
                            <span className="num">{n}</span>
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ── CTA ─────────────────────────────────────────────────────────────────────
const Cta = () => {
    const [ref, visible] = useReveal();
    return (
        <section className="cta">
            <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
                <p className="eyebrow">Empieza hoy</p>
                <h2 className="serif-title">Tu próximo look<br /><em>te está esperando.</em></h2>
                <a href="/login" className="btn-solid">Crear mi cuenta</a>
            </div>
        </section>
    );
};

// ── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
    <footer className="footer" id="contacto">
        <div className="footer-inner">
            <div>
                <a href="#" className="navbar-logo" style={{ display:"inline-flex", marginBottom:12 }}>
                    <span className="logo-mark">M</span>
                    <span className="logo-text">MAISON<em>LUX</em></span>
                </a>
                <p className="footer-tagline">El arte de vestir bien,<br />al alcance de todos.</p>
            </div>
            <div className="footer-cols">
                {[
                    { heading:"Colecciones", links:["Dama","Caballero","Niños","Novedades"] },
                    { heading:"Empresa",     links:["Nosotros","Sustentabilidad","Blog","Trabaja con nosotros"] },
                    { heading:"Ayuda",       links:["Envíos y devoluciones","Guía de tallas","Preguntas frecuentes","Contacto"] },
                ].map(({ heading, links }) => (
                    <div key={heading} className="footer-col">
                        <h5>{heading}</h5>
                        <ul>{links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
                    </div>
                ))}
            </div>
        </div>
        <div className="footer-bottom">
            <p>© 2025 MaisonLux. Todos los derechos reservados.</p>
            <p>Diseñado con cuidado · México</p>
        </div>
    </footer>
);

// ── Page ─────────────────────────────────────────────────────────────────────
export const Home = () => (
    <div className="page">
        <Navbar /><Hero /><Strip /><Categories /><Highlights /><Cta /><Footer />
    </div>
);

export default Home;