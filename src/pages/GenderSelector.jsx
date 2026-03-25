import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Genderselector.scss";
 
const categories = [
  {
    label: "HOMBRE",
    href: "#",
    image:
      "https://i.pinimg.com/736x/0e/dd/a2/0edda2bd233a50540869536bb6516e17.jpg",
  },
  {
    label: "MUJER",
    href: "#",
    image:
      "https://thumbs.dreamstime.com/b/retrato-en-blanco-y-negro-de-una-mujer-hermosa-con-aspecto-sexy-fotograf%C3%ADa-negra-bellas-mujeres-al-estilo-la-moda-fondo-oscuro-261016130.jpg",
  },
];
 
export default function GenderSelector() {
  const imageRefs = useRef([]);
 
  useEffect(() => {
    const handleMouseMove = (e) => {
      imageRefs.current.forEach((img) => {
        if (img) {
          img.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
        }
      });
    };
 
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);
 
  return (
    <div className="gender-body">
      <ul className="gender-list">
        {categories.map((cat, i) => (
          <li key={cat.label} className="gender-item">
            <Link to={cat.href} className="gender-link">
              {cat.label}
            </Link>
            <img
              ref={(el) => (imageRefs.current[i] = el)}
              className="gender-image"
              src={cat.image}
              alt={cat.label}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}