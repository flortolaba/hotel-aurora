import { useState } from "react";
import "./Catalog.css";

const habitaciones = [
  {
    id: 1,
    nombre: "Habitación Individual",
    descripcion: "Un espacio sereno y funcional, ideal para viajes de trabajo o descanso en solitario.",
    capacidad: "1 persona",
    cama: "Cama de 1 plaza y media",
    precio: 45000,
imagen: process.env.PUBLIC_URL + "/img/habitacion1.jpg",    color: "linear-gradient(135deg, #efe6da, #dccbb5)",
  },
  {
    id: 2,
    nombre: "Habitación Doble",
    descripcion: "Luminosa y confortable, con una cama king y escritorio junto a la ventana.",
    capacidad: "2 personas",
    cama: "Cama king size",
    precio: 65000,
imagen: process.env.PUBLIC_URL + "/img/habitacion2.jpg",    color: "linear-gradient(135deg, #e9e1d6, #cdb9a0)",
  },
  {
    id: 3,
    nombre: "Habitación Familiar",
    descripcion: "Amplia y cálida, pensada para compartir con comodidad en familia.",
    capacidad: "4 personas",
    cama: "1 cama queen y 2 camas individuales",
    precio: 90000,
imagen: process.env.PUBLIC_URL + "/img/habitacion3.jpg",    color: "linear-gradient(135deg, #ece4d9, #c9b296)",
  },
  {
    id: 4,
    nombre: "Suite Aurora",
    descripcion: "Nuestra mejor habitación: sala de estar, baño con bañera y vista panorámica.",
    capacidad: "2 personas",
    cama: "Cama king size premium",
    precio: 130000,
imagen: process.env.PUBLIC_URL + "/img/habitacion4.jpg",    color: "linear-gradient(135deg, #e6dccd, #b89a78)",
  },
];

function Catalog() {
  const [mensaje, setMensaje] = useState("");

  // Crea un Blob de texto con la reserva y lo descarga como .txt
  const reservar = (hab) => {
    const contenido =
      `Hotel Aurora - Confirmación de reserva\n` +
      `-------------------------------------\n` +
      `Habitación: ${hab.nombre}\n` +
      `Capacidad: ${hab.capacidad}\n` +
      `Precio por noche: $${hab.precio.toLocaleString("es-AR")}\n`;

    const blob = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `reserva-${hab.nombre.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);

    setMensaje(`Reserva de "${hab.nombre}" descargada correctamente.`);
  };

  return (
    <section>
      <div className="catalogo-intro">
        <p className="etiqueta">Hotel Aurora</p>
        <h1>Un lugar para descansar de verdad</h1>
        <p className="catalogo-lead">
          Habitaciones pensadas con calma: espacios simples, luz natural y
          todo lo necesario para sentirte como en casa.
        </p>
      </div>

      <div className="grilla-habitaciones">
        {habitaciones.map((hab) => (
          <article className="habitacion" key={hab.id}>
            <div className="habitacion-imagen" style={{ background: hab.color }}>
              <img
                src={hab.imagen}
                alt={hab.nombre}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span>Nº {hab.id}</span>
            </div>

            <div className="habitacion-cuerpo">
              <h3>{hab.nombre}</h3>
              <p className="habitacion-desc">{hab.descripcion}</p>

              <ul className="habitacion-datos">
                <li>{hab.capacidad}</li>
                <li>{hab.cama}</li>
              </ul>

              <div className="habitacion-pie">
                <p className="precio">
                  ${hab.precio.toLocaleString("es-AR")}
                  <span> / noche</span>
                </p>
                <button className="btn-reservar" onClick={() => reservar(hab)}>
                  Reservar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {mensaje && <p className="aviso">{mensaje}</p>}
    </section>
  );
}

export default Catalog;