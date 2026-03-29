import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { getProductosPorPrenda } from "../services/api";

const ColeccionDetalle = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductosPorPrenda(id)
      .then(setProductos)
      .catch(() => {});
  }, [id]);

  return (
    <div className="page">
      <NavBar />

      <div className="products-grid">
        {productos.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-img" />
            <div className="product-info">
              <h4>{p.sku}</h4>
              <p>${p.precio}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ColeccionDetalle;