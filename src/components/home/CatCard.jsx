import { useState, useEffect } from "react";
import useReveal from "../../hooks/useReveal";
import { getProductosPorCategoria } from "../../services/api";
import Patterns from "../UI/Patterns";

const CatCard = ({ cat, index }) => {
  const [ref, visible] = useReveal();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductosPorCategoria(cat.id)
      .then(data => setProductos(data))
      .catch(() => {});
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

        {productos.length > 0 && (
          <p className="cat-card-count">
            {productos.length} piezas disponibles
          </p>
        )}

        <a href="#" className="cat-card-link">Ver colección</a>
      </div>
    </div>
  );
};

export default CatCard;