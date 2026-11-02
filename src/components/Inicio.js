import { Link } from "react-router-dom";
import habitaciones from "../data/habitaciones";
import hero from "../assets/hero.png";
import "./Inicio.css";

const servicios = [
  { icono: "📶", titulo: "Wi-Fi gratis", texto: "Conexión rápida en todo el hotel." },
  { icono: "🍳", titulo: "Desayuno incluido", texto: "Todas las mañanas, de 7 a 10 h." },
  { icono: "🅿️", titulo: "Estacionamiento", texto: "Cochera cubierta para huéspedes." },
  { icono: "🛎️", titulo: "Recepción 24 h", texto: "Siempre alguien para ayudarte." },
];

const ofertas = [
  {
    valor: "15%",
    detalle: "de descuento",
    titulo: "Escapada de fin de semana",
    texto: "Reservá 2 noches de viernes a domingo y ahorrá en tu estadía.",
    condicion: "Válida de viernes a domingo",
  },
  {
    valor: "3x2",
    detalle: "en estadías largas",
    titulo: "Quedate más, pagá menos",
    texto: "Reservá 3 noches y pagá solo 2 en habitaciones Doble y Familiar.",
    condicion: "Habitaciones Doble y Familiar",
  },
  {
    valor: "Gratis",
    detalle: "desayuno para niños",
    titulo: "Vacaciones en familia",
    texto: "Los menores de 10 años desayunan sin cargo junto a un adulto.",
    condicion: "Menores de 10 años",
  },
];

const opiniones = [
  {
    texto: "Habitaciones impecables y un ambiente muy tranquilo. Volveríamos sin dudar.",
    autor: "Carolina M.",
    detalle: "Suite Aurora",
  },
  {
    texto: "La atención del personal fue excelente y el desayuno, delicioso.",
    autor: "Martín R.",
    detalle: "Habitación Doble",
  },
  {
    texto: "Perfecto para viajar en familia: amplio, cómodo y todo muy limpio.",
    autor: "Lucía y familia",
    detalle: "Habitación Familiar",
  },
];

const formatoPrecio = (n) => "$" + n.toLocaleString("es-AR");

function Inicio() {
  return (
    <div className="inicio">
      {/* PORTADA */}
      <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
        <div className="hero-contenido">
          <p className="hero-etiqueta">Hotel boutique</p>
          <h1>Hotel Aurora</h1>
          <p className="hero-texto">
            Un lugar para descansar de verdad. Habitaciones luminosas, atención
            cuidada y todo lo necesario para sentirte como en casa.
          </p>

          <div className="hero-botones">
            <Link to="/reservas" className="btn-hero">
              Reservar ahora
            </Link>
            <Link to="/acerca-de-nosotros" className="btn-hero claro">
              Conocer el hotel
            </Link>
          </div>
        </div>
      </section>

      {/* FRANJA DE DATOS */}
      <section className="franja">
        <div className="franja-contenido">
          <div>
            <strong>14:00</strong>
            <span>Check-in</span>
          </div>
          <div>
            <strong>10:00</strong>
            <span>Check-out</span>
          </div>
          <div>
            <strong>24 h</strong>
            <span>Recepción</span>
          </div>
          <div>
            <strong>Gratis</strong>
            <span>Wi-Fi y desayuno</span>
          </div>
        </div>
      </section>

      {/* HABITACIONES */}
      <section className="seccion">
        <div className="seccion-titulo">
          <p className="etiqueta">Alojamiento</p>
          <h2>Nuestras habitaciones</h2>
        </div>

        <div className="hab-grid">
          {habitaciones.map((hab) => (
            <Link
              to="/reservas"
              state={{ habitacion: hab.id }}
              className="hab-card"
              key={hab.id}
            >
              <div className="hab-foto">
                <img src={hab.imagen} alt={hab.nombre} />
              </div>
              <div className="hab-info">
                <h3>{hab.nombre}</h3>
                <p>{hab.capacidad}</p>
                <span>Desde {formatoPrecio(hab.precio)} / noche</span>
                <em>Reservar esta habitación →</em>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* OFERTAS */}
      <section className="ofertas">
        <div className="seccion">
          <div className="seccion-titulo">
            <p className="etiqueta">Promociones</p>
            <h2>Ofertas especiales</h2>
          </div>

          <div className="ofertas-grid">
            {ofertas.map((o, i) => (
              <article className={`oferta oferta-${i + 1}`} key={o.titulo}>
                <div className="oferta-cabecera">
                  <span className="oferta-valor">{o.valor}</span>
                  <span className="oferta-detalle">{o.detalle}</span>
                </div>

                <div className="oferta-cuerpo">
                  <h3>{o.titulo}</h3>
                  <p>{o.texto}</p>
                  <small>{o.condicion}</small>
                  <Link to="/reservas" className="oferta-boton">
                    Reservar con esta oferta
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="servicios">
        <div className="seccion">
          <div className="seccion-titulo">
            <p className="etiqueta">Servicios</p>
            <h2>Todo lo que necesitás</h2>
          </div>

          <div className="servicios-grid">
            {servicios.map((s) => (
              <article key={s.titulo}>
                <span className="servicio-icono">{s.icono}</span>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPINIONES */}
      <section className="seccion">
        <div className="seccion-titulo">
          <p className="etiqueta">Opiniones</p>
          <h2>Lo que dicen nuestros huéspedes</h2>
        </div>

        <div className="opiniones-grid">
          {opiniones.map((o) => (
            <figure key={o.autor}>
              <p className="estrellas">★★★★★</p>
              <blockquote>“{o.texto}”</blockquote>
              <figcaption>
                <strong>{o.autor}</strong>
                <span>{o.detalle}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LLAMADO FINAL */}
      <section className="cta-final">
        <h2>Reservá tu estadía</h2>
        <p>
          Elegí tu habitación y seleccioná tus fechas en el calendario. ¿Tenés
          dudas? Escribinos.
        </p>
        <div className="hero-botones">
          <Link to="/reservas" className="btn-hero">
            Ir a reservas
          </Link>
          <Link
            to="/acerca-de-nosotros"
            state={{ ir: "consultas" }}
            className="btn-hero claro"
          >
            Hacer una consulta
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Inicio;