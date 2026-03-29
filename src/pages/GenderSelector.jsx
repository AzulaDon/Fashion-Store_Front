import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_Genderselector.scss";
 
const categories = [
  {
    label: "HOMBRE",
    value: "hombre",
    image:
      "https://i.pinimg.com/736x/0e/dd/a2/0edda2bd233a50540869536bb6516e17.jpg",
  },
  {
    label: "MUJER",
    value: "mujer",
    image:
      "https://thumbs.dreamstime.com/b/retrato-en-blanco-y-negro-de-una-mujer-hermosa-con-aspecto-sexy-fotograf%C3%ADa-negra-bellas-mujeres-al-estilo-la-moda-fondo-oscuro-261016130.jpg",
  },
];
 
export default function GenderSelector() {
  const imageRefs = useRef([]);
  const navigate = useNavigate();

  const handleSelect = (gender) => {
    console.log("CLICK:", gender);
    localStorage.setItem("gender", gender);
    navigate("/");
  };
 
  return (
    <div className="gender-body">
      <ul className="gender-list">
        {categories.map((cat, i) => (
          <li key={cat.label} className="gender-item">
            <button className="gender-link" onClick={() => handleSelect(cat.value)}
            >
              {cat.label}
            </button>
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