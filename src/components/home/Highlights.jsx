import useReveal from "../../hooks/useReveal";

const Highlights = () => {
  const [ref, visible] = useReveal();

  const items = [
    { n:"01", title:"Selección curada",  desc:"Cada pieza pasa por un proceso de selección riguroso." },
    { n:"02", title:"Tallas inclusivas", desc:"Ropa para todos los cuerpos." },
    { n:"03", title:"Envío express",     desc:"Entrega en 24–48 hrs." },
    { n:"04", title:"Asesoría personal", desc:"Te ayudamos a crear tu look perfecto." },
  ];

  return (
    <section className="highlights">
      <div ref={ref} className={`highlights-inner ${visible ? "visible" : ""}`}>
        <div>
          <p className="eyebrow">¿Por qué elegirnos?</p>
          <h2 className="serif-title">Calidad que<br /><em>se siente.</em></h2>
        </div>

        <div className="highlights-grid">
          {items.map(({ n, title, desc }) => (
            <div key={n} className="highlights-item">
              <span className="num">{n}</span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;