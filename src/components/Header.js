import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import contacto from "../data/contacto";
import {
  IconoInstagram,
  IconoFacebook,
  IconoWhatsapp,
  IconoTelefono,
  IconoCorreo,
} from "../data/iconos";
import "./Header.css";

function Header() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  // Con el menú abierto: se bloquea el scroll y se cierra con la tecla Esc
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";

    const alTeclear = (e) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);

    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <>
      <header className="header">
        <div className="barra-superior">
          <div className="barra-contenido">
            <div className="barra-datos">
              <span>
                <IconoTelefono /> {contacto.telefono}
              </span>
              <span>
                <IconoCorreo /> {contacto.email}
              </span>
            </div>
            <div className="barra-redes">
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
          </div>
        </div>

        <div className="header-contenido">
          <NavLink to="/" className="marca">
            Aurora<span className="marca-sub">Hotel</span>
          </NavLink>

          <div className="header-acciones">
            <NavLink to="/reservas" className="header-cta">
              Reservar
            </NavLink>

            {/* Botón hamburguesa: tres líneas horizontales */}
            <button
              type="button"
              className="hamburguesa"
              onClick={() => setAbierto(true)}
              aria-label="Abrir el menú"
              aria-expanded={abierto}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Fondo oscuro detrás del panel */}
      <div
        className={`fondo-menu ${abierto ? "visible" : ""}`}
        onClick={cerrar}
      ></div>

      {/* Panel lateral con las opciones */}
      <aside
        className={`panel-menu ${abierto ? "abierto" : ""}`}
        aria-hidden={!abierto}
      >
        <div className="panel-cabecera">
          <span className="panel-marca">
            Aurora<small>Hotel</small>
          </span>
          <button
            type="button"
            className="panel-cerrar"
            onClick={cerrar}
            aria-label="Cerrar el menú"
          >
            ✕
          </button>
        </div>

        <nav className="panel-nav">
          <NavLink to="/" end onClick={cerrar}>
            Inicio
          </NavLink>
          <NavLink to="/reservas" onClick={cerrar}>
            Reservas
          </NavLink>
          <NavLink to="/acerca-de-nosotros" onClick={cerrar}>
            Acerca de nosotros
          </NavLink>
          <Link
            to="/acerca-de-nosotros"
            state={{ ir: "consultas" }}
            onClick={cerrar}
          >
            Consultas
          </Link>
        </nav>

        <div className="panel-pie">
          <p>
            <IconoTelefono /> {contacto.telefono}
          </p>
          <p>
            <IconoCorreo /> {contacto.email}
          </p>

          <div className="panel-redes">
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
        </div>
      </aside>
    </>
  );
}

export default Header;