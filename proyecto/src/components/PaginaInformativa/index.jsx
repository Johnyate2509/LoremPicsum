import React from "react";
import "./style.css";

function PaginaInformativa() {
  return (
    <div className="info-container">
      <h2 className="info-titulo">Bienvenido a las fotografias mejores tomadas</h2>

<p className="info-descripcion">
  Prepárate para adentrarte en un universo visual infinito, donde cada imagen es una ventana a mundos desconocidos y paisajes sorprendentes.  
  Acompaña tu curiosidad en un viaje estético a través de los recursos de la API de Lorem Picsum, 
  explorando autores, estilos y composiciones únicas.  
  Sumérgete en esta galería de inspiración, descubre los secretos detrás de cada fotografía y déjate llevar por la belleza de lo inesperado.
</p>

      <a
        href="https://github.com/Johnyate2509"
        target="_blank"
        rel="noopener noreferrer"
        className="info-link"
      >
        Ingresa a mi perfil de GitHub
      </a>

      <h2 className="info-autor">John Anderson Yate Agredo</h2>
    </div>
  );
}

export default PaginaInformativa;
