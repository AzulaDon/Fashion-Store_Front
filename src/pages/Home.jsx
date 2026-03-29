import { Navigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import "../styles/main.scss";

import Categories from "../components/home/Categories";
import Highlights from "../components/home/Highlights";
import Cta from "../components/home/Cta";
import NavBar from "../components/layout/NavBar";
import Hero from "../components/layout/HeroBanner";
import Footer from "../components/layout/Footer";
import Strip from "../components/home/strip";

// ── CONFIG DINÁMICA ─────────────────────────

const HERO_CONTENT = {
  hombre: {
    eyebrow: "Colección Caballero · 2025",
    title: "Estilo que define\ncarácter.",
    subtitle: "Elegancia masculina moderna para cada ocasión.",
  },
  mujer: {
    eyebrow: "Colección Dama · 2025",
    title: "El arte de\nresaltar tu esencia.",
    subtitle: "Moda femenina que inspira cada momento.",
  },
};

const STRIP_DATA = {
  hombre: [
    "Envío gratis en compras +$999",
    "Nueva colección masculina",
    "Estilo premium garantizado"
  ],
  mujer: [
    "Nueva colección femenina",
    "Envío express disponible",
    "Moda exclusiva 2025"
  ]
};


export const Home = () => {
  const gender = localStorage.getItem("gender");

  const { categorias, loading } = useCategories();

  console.log("Render home:", gender);

  if (!gender) return <Navigate to="/select-gender" />;

  if (loading) return <p>Cargando...</p>;

  const heroData = HERO_CONTENT[gender];
  const stripData = STRIP_DATA[gender];
  const categories = categorias[gender];

  return (
    <div className="page">

      <NavBar />

      <Hero
        eyebrow={heroData.eyebrow}
        title={heroData.title}
        subtitle={heroData.subtitle}
      />

      <Strip items={stripData} />

      <Categories cats={categories} />

      <Highlights />

      <Cta />

      <Footer />

    </div>
  );
};

export default Home;