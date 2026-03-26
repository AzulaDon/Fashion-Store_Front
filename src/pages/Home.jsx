import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
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

const CATS = {
  hombre: [
    {
      id: "camisas",
      label: "Camisas",
      tag: "Estilo formal",
      accent: "#8da8b8",
      bg: "linear-gradient(160deg,#0d1218,#1a2a38)",
      desc: "Camisas elegantes y casuales.",
      items: ["Formal", "Casual", "Slim fit"],
      pattern: "lines",
    },
    {
      id: "pantalones",
      label: "Pantalones",
      tag: "Comodidad total",
      accent: "#6e7f80",
      bg: "linear-gradient(160deg,#111,#2b2b2b)",
      desc: "Diseño moderno con comodidad.",
      items: ["Jeans", "Chinos", "Vestir"],
      pattern: "circles",
    },
  ],

  mujer: [
    {
      id: "vestidos",
      label: "Vestidos",
      tag: "Elegancia femenina",
      accent: "#c9a96e",
      bg: "linear-gradient(160deg,#1a1208,#3d2a12)",
      desc: "Vestidos para cualquier ocasión.",
      items: ["Casual", "Fiesta", "Formal"],
      pattern: "circles",
    },
    {
      id: "blusas",
      label: "Blusas",
      tag: "Estilo versátil",
      accent: "#b76e79",
      bg: "linear-gradient(160deg,#1a0f14,#3a1f28)",
      desc: "Looks elegantes y modernos.",
      items: ["Casual", "Elegante", "Office"],
      pattern: "dots,"
    },
  ],
};

// ── COMPONENTE ─────────────────────────

export const Home = () => {
//   const [gender, setGender] = useState(null);

//   useEffect(() => {
//     const g = localStorage.getItem("gender");
//     setGender(g);
//   }, []);
  const gender = localStorage.getItem("gender");

  console.log("Render home:", gender);

  if (!gender) return <Navigate to="/select-gender" />;

  const heroData = HERO_CONTENT[gender];
  const stripData = STRIP_DATA[gender];
  const categories = CATS[gender];

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