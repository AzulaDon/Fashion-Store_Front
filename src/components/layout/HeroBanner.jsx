import React from "react";
import { motion } from "framer-motion";
import useReveal from "../../hooks/useReveal";
import "../../styles/components/_hero.scss";

const Hero = () => {
    const [ref, visible] = useReveal();

    return (
        <section className={`hero ${visible ? "visible" : ""}`} ref={ref}>
            <motion.div className="hero-bg"  initial={{ opacity: 0, scale: 1.05 }} animate={visible ? { opacity:1, scale:1 } : {}} transition={{ duration: 1.2 }}/>
                <div className="hero-content">
                    <motion.p className="eyebrow" initial={{ opacity: 0, y: -20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>Colección Primavera · 2025</motion.p>
                    <motion.h1 className="serif-title" initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>El arte de<br /><em>vestir bien.</em></motion.h1>
                    <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={ visible ? { opacity:1 } : {}} transition={{ delay: 0.6 }}>
                        Piezas cuidadosamente seleccionadas para cada momento,<br />cada persona, cada historia.
                    </motion.p>
                    <motion.div className="hero-actions" initial={{ y: 20, opacity: 0}} animate={visible ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.8}}>
                        <a href="#categorias" className="btn-solid">Explorar colección</a>
                        <a href="#lookbook" className="btn-ghost">Ver lookbook</a>
                    </motion.div>
                </div>
            <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={ visible ? { opacity:1 } : {}} transition={{ delay: 1.2 }}><span /><p>Desplaza</p></motion.div>
        </section>
    );
};

export default Hero;