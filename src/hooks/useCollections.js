import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8080/api";

const useColecciones = () => {
  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/colecciones`)
      .then(res => res.json())
      .then(data => {

        const mapped = data.map((c, i) => ({
          id: c.id,
          label: c.coleccion,
          desc: `Descubre nuestra colección de ${c.coleccion}`,
          
          accent: ["#c9a96e", "#8da8b8", "#b76e79"][i % 3],
          bg: "linear-gradient(160deg,#1a1208,#3d2a12)",
          pattern: ["circles", "lines", "dots"][i % 3],
        }));

        setColecciones(mapped);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { colecciones, loading };
};

export default useColecciones;