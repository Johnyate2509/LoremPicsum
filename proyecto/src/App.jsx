import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Lista from "./components/Lista";
import Filtro from "./components/Filtro";
import Buscador from "./components/Buscador";
import Detalle from "./components/Detalle";
import Favoritos from "./components/Favoritos";
import PestañaOriginal from "./components/PestañaOriginal";
import PaginaInformativa from "./components/PaginaInformativa";

const STORAGE_KEY = "favoritos_picsum";

const App = () => {
  const [imagenes, setImagenes] = useState([]);
  const [seleccion, setSeleccion] = useState("Lista");
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 🔹 Cargar imágenes desde la API Picsum
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=500")
      .then((res) => res.json())
      .then((data) => setImagenes(data))
      .catch((err) => console.error("Error al cargar imágenes", err));
  }, []);

  // 🔹 Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
  }, [favoritos]);

  // 🔹 Alternar favorito (añadir o quitar)
  const toggleFavorito = (img) => {
    setFavoritos((prev) => {
      const existe = prev.some((f) => f.id === img.id);
      if (existe) return prev.filter((f) => f.id !== img.id);
      return [...prev, img];
    });
  };

  // 🔹 Renderizar según la pestaña seleccionada
  const renderVista = () => {
    switch (seleccion) {
      case "Lista":
        return <Lista imagenes={imagenes} onFavorito={toggleFavorito} />;
      case "Filtro":
        return <Filtro imagenes={imagenes} />;
      case "Buscador":
        return <Buscador imagenes={imagenes} />;
      case "Detalle":
        return <Detalle imagenes={imagenes} />;
      case "Favoritos":
        return <Favoritos favoritos={favoritos} onFavorito={toggleFavorito} />;
      case "PestañaOriginal":
        return <PestañaOriginal imagenes={imagenes} />;
      case "PáginaInformativa":
        return <PaginaInformativa />;
      default:
        return <Lista imagenes={imagenes} onFavorito={toggleFavorito} />;
    }
  };

  return (
    <div>
      <Menu setSeleccion={setSeleccion} />
      <div className="contenido">{renderVista()}</div>
    </div>
  );
};

export default App;
