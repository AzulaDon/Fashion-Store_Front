import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductosPorColeccion } from "../services/api";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import "../styles/components/_productCard.scss";

const ColeccionDetalle = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || id === "undefined") return;

    setLoading(true);
    getProductosPorColeccion(id)
      .then((data) => {
        console.log("Productos recibidos:", data); 
        setProductos(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="page">
      <NavBar />
      <p className="loading">Cargando productos...</p>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="page">
      <NavBar />
      <p className="error">Error: {error}</p>
      <Footer />
    </div>
  );

  return (
    <div className="page">
      <NavBar />

      <div className="products-grid">
        {productos.length === 0 ? (
          <p>No hay productos en esta colección.</p>
        ) : (
          productos.map((p) => (
            <div key={p.prendaId} className="product-card">
              <div className="product-img" />
              <div className="product-info">
                <h3>{p.nombre}</h3>
                <p className="genero">{p.genero}</p>
                <p className="temporada">{p.temporada}</p>
                <p className="precio">${p.precio}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ColeccionDetalle;