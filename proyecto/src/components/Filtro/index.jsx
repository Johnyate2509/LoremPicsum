import React, { useEffect, useState } from "react";
import "./style.css";

function Filtro() {
  const [fotos, setFotos] = useState([]);
  const [fotografoSeleccionado, setFotografoSeleccionado] = useState(null);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=500")
      .then((res) => res.json())
      .then((data) => setFotos(data))
      .catch((err) => console.error("Error al cargar imágenes:", err));
  }, []);

  const fotografos = [...new Set(fotos.map((foto) => foto.author))];
  const fotosFiltradas = fotos.filter(
    (foto) => foto.author === fotografoSeleccionado
  );

  return (
    <div className="filtro-container">
      <h1>📸 Filtro por Fotógrafo</h1>

      <div className="lista-fotografos">
        {fotografos.map((nombre) => (
          <button
            key={nombre}
            className={`boton-fotografo ${
              nombre === fotografoSeleccionado ? "activo" : ""
            }`}
            onClick={() => setFotografoSeleccionado(nombre)}
          >
            {nombre}
          </button>
        ))}
      </div>

      <div className="galeria lista">
        {fotografoSeleccionado ? (
          fotosFiltradas.length > 0 ? (
            fotosFiltradas.map((foto) => (
              <div className="card" key={foto.id}>
                <img src={foto.download_url} alt={foto.author} />
                <p>{foto.author}</p>
              </div>
            ))
          ) : (
            <p>No hay fotos disponibles para este fotógrafo.</p>
          )
        ) : (
          <p>Selecciona un fotógrafo para ver sus fotos.</p>
        )}
      </div>
    </div>
  );
}

export default Filtro;
