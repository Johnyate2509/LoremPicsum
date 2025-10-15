import React, { useEffect, useState } from "react";
import "./style.css";

function Buscador() {
  const [imagenes, setImagenes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState("todas"); // podrías añadir filtros más adelante

  useEffect(() => {
    const url = "https://picsum.photos/v2/list?limit=500";

    const fetchJson = async () => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Error al cargar imágenes: " + resp.status);
        const json = await resp.json();
        setImagenes(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchJson();
  }, []);

  // Filtra las imágenes por autor
  const imagenesFiltradas = imagenes.filter((img) =>
    img.author.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="buscador">
      <h2>🔍 Buscador de Imágenes</h2>

      <div className="buscador-controles">
        <input
          type="text"
          placeholder="Buscar por autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button onClick={() => setModo("todas")}>Mostrar todas</button>
      </div>

      <div className="buscador-lista">
        {imagenes.length === 0 ? (
          <p>Cargando imágenes...</p>
        ) : imagenesFiltradas.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          <ul className="grid-imagenes">
            {imagenesFiltradas.map((img) => (
              <li key={img.id} className="card">
                <img src={img.download_url} alt={img.author} />
                <div className="info">
                  <strong>{img.author}</strong>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Buscador;
