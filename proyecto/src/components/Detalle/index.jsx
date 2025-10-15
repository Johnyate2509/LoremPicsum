import React, { useEffect, useState } from "react";
import "./style.css";

function Detalle() {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        const resp = await fetch("https://picsum.photos/v2/list?limit=500");
        const data = await resp.json();
        setImagenes(data);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };
    fetchFotos();
  }, []);

  // Agrupar las imágenes por fotógrafo
  const imagenesPorFotografo = imagenes.reduce((acc, foto) => {
    if (!acc[foto.author]) acc[foto.author] = [];
    acc[foto.author].push(foto);
    return acc;
  }, {});

  return (
    <div className="detalle">
      <h1 className="detalle-titulo">Galería de Fotógrafos</h1>

      {Object.entries(imagenesPorFotografo).map(([autor, fotos]) => (
        <div key={autor} className="grupo">
          <h2 className="nombre-fotografo">{autor}</h2>
          <div className="lista">
            {fotos.map((foto) => (
              <div key={foto.id} className="card">
                <img src={foto.download_url} alt={foto.author} />
                <button
                  className="btn-original"
                  onClick={() => window.open(foto.url, "_blank")}
                >
                  Ver imagen original
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Detalle;
