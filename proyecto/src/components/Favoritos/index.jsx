import React from "react";
import Lista from "../Lista";
import "./style.css";

function Favoritos() {
  return (
    <div className="favoritos-container">
      <h2 className="favoritos-titulo">💖 Mis Favoritos</h2>
      <Lista modoFavoritos={true} />
    </div>
  );
}

export default Favoritos;
