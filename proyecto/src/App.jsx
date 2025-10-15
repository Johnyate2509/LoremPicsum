import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Lista from "./components/Lista";
import Filtro from "./components/Filtro";
import Buscador from "./components/Buscador";
import Detalle from "./components/Detalle";
import Favoritos from "./components/Favoritos";
import PestañaOriginal from "./components/PestañaOriginal";
import PaginaInformativa from "./components/PaginaInformativa";

const App = () => {
  const [imagenes, setImagenes] = useState([]);
  const [seleccion, setSeleccion] = useState("Lista");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=500")
      .then((res) => res.json())
      .then((data) => setImagenes(data))
      .catch((err) => console.error("Error al cargar imágenes", err));
  }, []);

  const agregarFavorito = (img) => {
    if (!favoritos.some((f) => f.id === img.id)) {
      setFavoritos([...favoritos, img]);
    }
  };

  const renderVista = () => {
    switch (seleccion) {
      case "Lista":
        return <Lista imagenes={imagenes} onSelect={setSeleccion} onFavorito={agregarFavorito} />;
      case "Filtro":
        return <Filtro imagenes={imagenes} />;
      case "Buscador":
        return <Buscador imagenes={imagenes} />;
      case "Detalle":
        return <Detalle />;
      case "Favoritos":
        return <Favoritos favoritos={favoritos} />;
      case "PestañaOriginal":
        return <PestañaOriginal />;
      case "PáginaInformativa":
        return <PaginaInformativa />;
      default:
        return <Lista imagenes={imagenes} />;
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
