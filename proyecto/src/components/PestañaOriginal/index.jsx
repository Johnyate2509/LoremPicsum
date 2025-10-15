import React, { useEffect, useState } from "react";
import "./style.css";

function PestañaOriginal() {
  const [imagenes, setImagenes] = useState([]);
  const [fotoGanadora, setFotoGanadora] = useState(null);
  const [fotoReto, setFotoReto] = useState(null);

  // Cargar imágenes desde la API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const resp = await fetch("https://picsum.photos/v2/list?limit=500");
        const data = await resp.json();
        setImagenes(data);
        inicializarFotos(data);
      } catch (error) {
        console.error("Error al cargar imágenes:", error);
      }
    };
    fetchImages();
  }, []);

  // Inicializar con dos fotos
  const inicializarFotos = (lista) => {
    if (lista.length < 2) return;
    const [a, b] = obtenerDosAleatorias(lista);
    setFotoGanadora(a);
    setFotoReto(b);
  };

  // Obtener dos imágenes diferentes
  const obtenerDosAleatorias = (lista) => {
    const i1 = Math.floor(Math.random() * lista.length);
    let i2;
    do {
      i2 = Math.floor(Math.random() * lista.length);
    } while (i2 === i1);
    return [lista[i1], lista[i2]];
  };

  // Elegir ganador y traer nueva foto para el reto
  const handleSeleccion = (eleccion) => {
    if (!imagenes.length) return;

    // La foto elegida se vuelve la ganadora
    setFotoGanadora(eleccion);

    // Elegir una nueva foto aleatoria diferente a la ganadora actual
    let nueva;
    do {
      nueva = imagenes[Math.floor(Math.random() * imagenes.length)];
    } while (nueva.id === eleccion.id);

    setFotoReto(nueva);
  };

  return (
    <div className="vs-container">
      <h2 className="vs-titulo">📸 ¡Elige tu foto favorita!</h2>

      {fotoGanadora && fotoReto ? (
        <div className="vs-fotos">
          <div
            className="foto-card foto-ganadora"
            onClick={() => handleSeleccion(fotoGanadora)}
          >
            <img src={fotoGanadora.download_url} alt={fotoGanadora.author} />
            <p>🏆 {fotoGanadora.author}</p>
          </div>

          <div className="vs-texto">VS</div>

          <div className="foto-card" onClick={() => handleSeleccion(fotoReto)}>
            <img src={fotoReto.download_url} alt={fotoReto.author} />
            <p>{fotoReto.author}</p>
          </div>
        </div>
      ) : (
        <p className="cargando">Cargando fotos...</p>
      )}
    </div>
  );
}

export default PestañaOriginal;
