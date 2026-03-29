import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import "../styles/pages/_Ofertas.scss"

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/promociones")
      .then(res => res.json())
      .then(setOfertas)
      .catch(() => {});
  }, []);

  return (
    <div className="page">
      <NavBar />

      <section className="offers-page">
        <div className="section-header">
          <p className="eyebrow">Descuentos</p>
          <h2 className="serif-title">
            Mejores <em>ofertas</em>
          </h2>
        </div>

        <div className="offers-grid">
          {ofertas.map(o => (
            <div key={o.id} className="offer-card">
              <h3>{o.nombre}</h3>
              <p>{o.descripcion}</p>
              <span>
                {(o.descuento || o.porcentaje || o.descuentoPorcentaje || 0)}% OFF
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ofertas;