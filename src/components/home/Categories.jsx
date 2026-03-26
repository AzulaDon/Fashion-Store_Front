import useReveal from "../../hooks/useReveal";
import CatCard from "./CatCard";

const Categories = ({ cats }) => {
  const [ref, visible] = useReveal();

  return (
    <section className="categories" id="categorias">
      <div ref={ref} className={`section-header reveal ${visible ? "visible" : ""}`}>
        <p className="eyebrow">Nuestras colecciones</p>
        <h2 className="serif-title">Moda para<br /><em>toda la familia</em></h2>
        <p className="section-sub">Tres universos de estilo, una sola boutique.</p>
      </div>

      <div className="cat-grid">
        {cats.map((cat, i) => (
          <CatCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Categories;