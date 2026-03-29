import { Link } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import useColecciones from "../hooks/useCollections";
import "../styles/pages/_Collections.scss";

const Collections = () => {
  const { colecciones, loading } = useColecciones();

  if (loading) {
    return (
      <div className="page">
        <NavBar />
        <p className="loading">Cargando colecciones...</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <NavBar />

      <section className="collections-page">
        <div className="section-header">
          <p className="eyebrow">Explora</p>
          <h2 className="serif-title">
            Nuestras <em>colecciones</em>
          </h2>
        </div>

        <div className="collections-grid">
            {colecciones.map((cat) => (
            <Link
                key={`${cat.id}-${cat.label}`}
                to={`/coleccion/${cat.id}`}
                className="collection-card"
            >
                <div className="collection-content">
                    <h3>{cat.label}</h3>
                    <p>{cat.desc}</p>
                    <span>Explorar →</span>
                </div>
            </Link>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;