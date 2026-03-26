const Footer = () => (
  <footer className="footer" id="contacto">
    <div className="footer-inner">

      <div>
        <span className="logo-text">MAISON<em>LUX</em></span>
        <p className="footer-tagline">
          El arte de vestir bien,<br />al alcance de todos.
        </p>
      </div>

      <div className="footer-cols">
        {[
          { heading:"Colecciones", links:["Dama","Caballero","Niños"] },
          { heading:"Empresa", links:["Nosotros","Blog"] },
          { heading:"Ayuda", links:["Envíos","Contacto"] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <h5>{heading}</h5>
            <ul>
              {links.map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </div>

    </div>
  </footer>
);

export default Footer;