import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import "../../styles/components/hero.scss"

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-bg" />
                <div className="hero-content">
                    <p className="eyebrow">Colección Primavera · 2025</p>
                    <h1 className="serif-title">El arte de<br /><em>vestir bien.</em></h1>
                    <p className="hero-subtitle">
                        Piezas cuidadosamente seleccionadas para cada momento,<br />cada persona, cada historia.
                    </p>
                    <div className="hero-actions">
                        <a href="#categorias" className="btn-solid">Explorar colección</a>
                        <a href="#categorias" className="btn-ghost">Ver lookbook</a>
                    </div>
                </div>
            <div className="hero-scroll"><span /><p>Desplaza</p></div>
        </section>
    );
}