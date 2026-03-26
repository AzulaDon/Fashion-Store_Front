import useReveal from "../../hooks/useReveal";

const Cta = () => {
  const [ref, visible] = useReveal();

  return (
    <section className="cta">
      <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
        <p className="eyebrow">Empieza hoy</p>
        <h2 className="serif-title">
          Tu próximo look<br /><em>te está esperando.</em>
        </h2>
        <a href="/login" className="btn-solid">Crear mi cuenta</a>
      </div>
    </section>
  );
};

export default Cta;