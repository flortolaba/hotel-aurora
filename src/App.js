import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Inicio from "./components/Inicio";
import AcercaDeNosotros from "./components/AcercaDeNosotros";
import Reservas from "./components/Reservas";
import contacto from "./data/contacto";
import {
  IconoInstagram,
  IconoFacebook,
  IconoWhatsapp,
  IconoTelefono,
  IconoCorreo,
  IconoUbicacion,
} from "./data/iconos";
import "./App.css";

function App() {
  const location = useLocation();

  // Al cambiar de página, volver arriba (salvo que la página tenga que
  // desplazarse sola a una sección)
  useEffect(() => {
    if (!location.state) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="app">
      <Header />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </main>

      <a
        className="whatsapp-flotante"
        href={contacto.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribinos por WhatsApp"
      >
        <IconoWhatsapp />
      </a>

      <footer className="pie">
        <div className="pie-contenido">
          <div>
            <p className="pie-marca">Hotel Aurora</p>
            <p>
              Habitaciones simples y luminosas, con atención cuidada las 24
              horas.
            </p>

            <p className="pie-seguinos">Seguinos en redes</p>
            <div className="redes-pie">
              <a
                className="red"
                href={contacto.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <IconoInstagram />
              </a>
              <a
                className="red"
                href={contacto.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <IconoFacebook />
              </a>
              <a
                className="red"
                href={contacto.whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <IconoWhatsapp />
              </a>
            </div>
          </div>

          <div>
            <h3>Contacto</h3>
            <p className="pie-linea">
              <IconoUbicacion />
              <span>{contacto.direccion}</span>
            </p>
            <p className="pie-linea">
              <IconoTelefono />
              <span>{contacto.telefono}</span>
            </p>
            <p className="pie-linea">
              <IconoCorreo />
              <span>{contacto.email}</span>
            </p>
          </div>

          <div>
            <h3>Horarios</h3>
            <p>Check-in: desde las 14:00</p>
            <p>Check-out: hasta las 10:00</p>
            <p>Recepción: 24 horas</p>
          </div>

          <div>
            <h3>Navegación</h3>
            <Link to="/">Inicio</Link>
            <Link to="/reservas">Reservas</Link>
            <Link to="/acerca-de-nosotros">Acerca de nosotros</Link>
            <Link to="/acerca-de-nosotros" state={{ ir: "consultas" }}>
              Consultas
            </Link>
          </div>
        </div>

        <div className="pie-inferior">
          <p>© 2026 Hotel Aurora · Lenguaje IV · Universidad Católica de Salta</p>
        </div>
      </footer>
    </div>
  );
}

export default App;