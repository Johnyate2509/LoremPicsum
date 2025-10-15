import React from "react";
import "./style.css";

const Lista = ({ imagenes, onFavorito }) => {
  return (
    <div className="lista">
      {imagenes.map((img) => (
        <div key={img.id} className="card">
          <img src={img.download_url} alt={img.author} />
          <p>{img.author}</p>
          <button onClick={() => onFavorito(img)}>❤️ Favorito</button>
        </div>
      ))}
    </div>
  );
};

export default Lista;
