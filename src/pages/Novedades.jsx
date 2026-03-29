import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { getProductos } from "../services/api";
import "../styles/pages/_Novedades.scss"

const Novedades = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch(() => {});
  }, []);

  return (
    <div className="page">
      <NavBar />

      <section className="products-page">
        <div className="section-header">
          <p className="eyebrow">Nuevo</p>
          <h2 className="serif-title">
            Últimas <em>novedades</em>
          </h2>
        </div>

        <div className="products-grid">
          {productos.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-img" style={{ backgroundImage: `url(${p.imagen})`, backgroundSize: "cover" }}/>

              <div className="product-info">
                <h4>{p.sku}</h4>
                <p>${p.precio}</p>
                <span>Stock: {p.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Novedades;