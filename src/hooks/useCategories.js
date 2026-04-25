import { useState, useEffect } from "react";
import { getPrendas } from "../services/api";

const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrendas()
      .then(data => {
        
        const mapped = data.map(p => ({
          id: p.prendaId,
          label: p.nombre,
          tag: "Colección",
          accent: "#c9a96e",
          bg: "linear-gradient(160deg,#1a1208,#3d2a12)",
          desc: `Descubre nuestra colección de ${p.nombre}`,
          items: [],
          pattern: "circles",
        }));

        setCategorias(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { categorias, loading };
};

export default useCategorias;