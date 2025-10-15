import React from "react";
import "./style.css";

const Menu = ({ setSeleccion }) => {
  const opciones = [
    "Lista",
    "Filtro",
    "Buscador",
    "Detalle",
    "Favoritos",
    "PestañaOriginal",
    "PáginaInformativa",
  ];

  return (
    <nav className="menu">
      {opciones.map((op) => (
        <button key={op} onClick={() => setSeleccion(op)} className="menu-btn">
          {op}
        </button>
      ))}
    </nav>
  );
};

export default Menu;
