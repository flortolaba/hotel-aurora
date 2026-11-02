import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import hero from "../assets/hero.png";
import contacto from "../data/contacto";
import {
  IconoInstagram,
  IconoFacebook,
  IconoWhatsapp,
  IconoTelefono,
  IconoCorreo,
  IconoUbicacion,
} from "../data/iconos";
import "./AcercaDeNosotros.css";

const medios = [
  { icono: <IconoUbicacion />, titulo: "Dirección", texto: contacto.direccion },
  { icono: <IconoTelefono />, titulo: "Teléfono", texto: contacto.telefono },
  {
    icono: <IconoWhatsapp />,
    titulo: "WhatsApp",
    texto: contacto.whatsapp,
    href: contacto.whatsappLink,
  },
  {
    icono: <IconoCorreo />,
    titulo: "Correo",
    texto: contacto.email,
    href: "mailto:" + contacto.email,
  },
  {
    icono: <IconoInstagram />,
    titulo: "Instagram",
    texto: "@hotelaurora",
    href: contacto.instagram,
  },
  {
    icono: <IconoFacebook />,
    titulo: "Facebook",
    texto: "Hotel Aurora",
    href: contacto.facebook,
  },
];

const preguntas = [
  {
    pregunta: "¿A qué hora es el check-in y el check-out?",
    respuesta:
      "El check-in es desde las 14:00 y el check-out hasta las 10:00. Si llegás antes o necesitás salir más tarde, consultanos y lo coordinamos según disponibilidad.",
  },
  {
    pregunta: "¿El desayuno está incluido?",
    respuesta:
      "Sí, todas las tarifas incluyen desayuno buffet de 7:00 a 10:00. Los menores de 10 años desayunan sin cargo junto a un adulto.",
  },
  {
    pregunta: "¿Puedo cancelar o modificar mi reserva?",
    respuesta:
      "Podés cancelar sin costo hasta 48 horas antes de la llegada. Para modificar fechas o habitación, escribinos por WhatsApp o mediante el formulario de consultas.",
  },
  {
    pregunta: "¿Tienen estacionamiento?",
    respuesta:
      "Contamos con cochera cubierta para huéspedes, sujeta a disponibilidad. Te recomendamos avisarnos al reservar.",
  },
  {
    pregunta: "¿Aceptan mascotas?",
    respuesta:
      "Aceptamos mascotas pequeñas en algunas habitaciones. Consultanos antes de reservar para confirmar la disponibilidad.",
  },
];

function AcercaDeNosotros() {
  const location = useLocation();
  const consultasRef = useRef(null);
  const [enviado, setEnviado] = useState(false);
  const [nombreEnviado, setNombreEnviado] = useState("");

  // Si venimos desde "Consultas", bajar directamente al formulario
  useEffect(() => {
    if (location.state && location.state.ir === "consultas") {
      const t = setTimeout(() => {
        if (consultasRef.current) {
          consultasRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
      return () => clearTimeout(t);
    }
  }, [location]);

  const enviarConsulta = (e) => {
    e.preventDefault();
    setNombreEnviado(new FormData(e.target).get("nombre"));
    setEnviado(true);
    e.target.reset();
  };

  return (
    <div className="contenedor">
      <section className="acerca">
        <div
          className="acerca-banner"
          style={{ backgroundImage: `url(${hero})` }}
        />

        <p className="etiqueta">Acerca de nosotros</p>
        <h1>Hospitalidad simple, atención cuidada</h1>

        <p className="acerca-texto">
          Hotel Aurora nace con una idea sencilla: el mejor lujo es la
          tranquilidad. Diseñamos cada habitación con materiales nobles, tonos
          suaves y espacios despejados, para que puedas descansar y disfrutar
          de tu estadía sin distracciones.
        </p>
        <p className="acerca-texto">
          Nuestro equipo trabaja para que cada detalle, desde la llegada hasta
          el desayuno, sea sencillo y agradable.
        </p>

        <div className="acerca-datos">
          <div>
            <strong>4</strong>
            <span>Tipos de habitación</span>
          </div>
          <div>
            <strong>24 h</strong>
            <span>Recepción</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Atención personalizada</span>
          </div>
        </div>

        <div className="acerca-grilla">
          <article>
            <h3>Comodidad</h3>
            <p>Camas amplias, buena luz natural y ambientes silenciosos.</p>
          </article>
          <article>
            <h3>Atención</h3>
            <p>Recepción las 24 horas para ayudarte en lo que necesites.</p>
          </article>
          <article>
            <h3>Simplicidad</h3>
            <p>Reservá en minutos, eligiendo tus fechas en el calendario.</p>
          </article>
        </div>

        {/* CONTACTO */}
        <div className="bloque">
          <p className="etiqueta">Contacto</p>
          <h2>Cómo encontrarnos</h2>

          <div className="contacto-grid">
            {medios.map((m) => {
              const Tarjeta = m.href ? "a" : "div";
              return (
                <Tarjeta
                  key={m.titulo}
                  className="contacto-card"
                  href={m.href}
                  target={m.href ? "_blank" : undefined}
                  rel={m.href ? "noreferrer" : undefined}
                >
                  <span className="contacto-icono">{m.icono}</span>
                  <div>
                    <small>{m.titulo}</small>
                    <p>{m.texto}</p>
                  </div>
                </Tarjeta>
              );
            })}
          </div>
        </div>

        {/* PREGUNTAS FRECUENTES */}
        <div className="bloque">
          <p className="etiqueta">Ayuda</p>
          <h2>Preguntas frecuentes</h2>

          <div className="faq">
            {preguntas.map((p) => (
              <details key={p.pregunta}>
                <summary>{p.pregunta}</summary>
                <p>{p.respuesta}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CONSULTAS */}
        <div className="consultas" ref={consultasRef}>
          <aside className="consultas-info">
            <p className="etiqueta-clara">Consultas</p>
            <h2>¿En qué podemos ayudarte?</h2>
            <p className="consultas-texto">
              Escribinos y te respondemos a la brevedad.
            </p>

            <ul className="consultas-medios">
              <li>
                <IconoTelefono />
                <span>{contacto.telefono}</span>
              </li>
              <li>
                <IconoWhatsapp />
                <span>{contacto.whatsapp}</span>
              </li>
              <li>
                <IconoCorreo />
                <span>{contacto.email}</span>
              </li>
            </ul>

            <div className="consultas-redes">
              <a
                href={contacto.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <IconoInstagram />
              </a>
              <a
                href={contacto.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <IconoFacebook />
              </a>
              <a
                href={contacto.whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <IconoWhatsapp />
              </a>
            </div>

            <p className="consultas-tiempo">
              Respondemos en menos de 24 horas.
            </p>
          </aside>

          <form className="consultas-form" onSubmit={enviarConsulta}>
            <div className="consultas-campos">
              <label className="campo-consulta">
                Nombre y apellido
                <input
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  required
                />
              </label>

              <label className="campo-consulta">
                Correo electrónico
                <input
                  name="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </label>

              <label className="campo-consulta">
                Asunto
                <select name="asunto" defaultValue="reservas">
                  <option value="reservas">Reservas y disponibilidad</option>
                  <option value="servicios">Servicios del hotel</option>
                  <option value="facturacion">Facturación</option>
                  <option value="otro">Otro</option>
                </select>
              </label>

              <label className="campo-consulta">
                Teléfono (opcional)
                <input
                  name="telefono"
                  type="tel"
                  placeholder="Ej: 387 000 0000"
                />
              </label>

              <label className="campo-consulta ancho">
                Mensaje
                <textarea
                  name="mensaje"
                  rows="5"
                  placeholder="Escribí tu consulta"
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn-consulta">
              Enviar consulta
            </button>

            {enviado && (
              <p className="exito">
                ¡Gracias, {nombreEnviado}! Recibimos tu consulta y te
                responderemos a la brevedad.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default AcercaDeNosotros;