import React, { useEffect, useState } from "react";
import "./style.css";

const STORAGE_KEY = "favoritos_picsum";

function safeParse(str, fallback = []) {
  try {
    const v = JSON.parse(str);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

const Lista = ({ imagenes = [], modoFavoritos = false }) => {
  const [favoritos, setFavoritos] = useState(() =>
    safeParse(localStorage.getItem(STORAGE_KEY), [])
  );

  // Mantener localStorage sincronizado cuando cambie "favoritos"
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
  }, [favoritos]);

  // Escuchar cambios de localStorage desde otra pestaña (opcional)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setFavoritos(safeParse(e.newValue, []));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFavorito = (img) => {
    setFavoritos((prev) => {
      const existe = prev.some((f) => f.id === img.id);
      if (existe) return prev.filter((f) => f.id !== img.id);
      return [...prev, img];
    });
  };

  // Si estamos en modoFavoritos, mostramos los favoritos actuales
  const listaMostrada = modoFavoritos ? favoritos : imagenes;

  return (
    <div className="lista">
      {listaMostrada.length === 0 ? (
        <p className="mensaje-vacio">
          {modoFavoritos ? "Aún no tienes favoritos ❤️" : "No hay imágenes para mostrar."}
        </p>
      ) : (
        listaMostrada.map((img) => {
          const esFavorito = favoritos.some((f) => f.id === img.id);
          return (
            <div key={img.id} className="card">
              <img src={img.download_url} alt={img.author} />
              <p>{img.author}</p>
              <button
                className={`btn-fav ${esFavorito ? "activo" : ""}`}
                onClick={() => toggleFavorito(img)}
              >
                {esFavorito ? "💔 Quitar" : "❤️ Favorito"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Lista;
