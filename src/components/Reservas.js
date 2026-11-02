import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import habitaciones from "../data/habitaciones";
import { IconoCheck } from "../data/iconos";
import "./Reservas.css";

registerLocale("es", es);

const formatoFecha = (fecha) => fecha.toLocaleDateString("es-AR");
const formatoPrecio = (n) => "$" + n.toLocaleString("es-AR");

const horasLlegada = [
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00 o más tarde",
];

const datosIniciales = {
  nombre: "",
  apellido: "",
  documento: "",
  email: "",
  telefono: "",
  adultos: 1,
  ninos: 0,
  llegada: "15:00",
  comentarios: "",
  acepto: false,
};

function Reservas() {
  const location = useLocation();
  const panelRef = useRef(null);

  // Si venimos desde Inicio con una habitación elegida, ya queda seleccionada
  const [habitacionId, setHabitacionId] = useState(
    location.state && location.state.habitacion
      ? location.state.habitacion
      : null
  );
  const [rango, setRango] = useState([null, null]);
  const [datos, setDatos] = useState(datosIniciales);

  const [fechaEntrada, fechaSalida] = rango;
  const habitacion = habitaciones.find((h) => h.id === habitacionId);

  const noches =
    fechaEntrada && fechaSalida
      ? Math.round((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24))
      : 0;
  const total = habitacion ? noches * habitacion.precio : 0;

  // Bajar directamente al calendario
  const irAlCalendario = () => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Al llegar desde Inicio con una habitación, bajar al calendario
  useEffect(() => {
    if (location.state && location.state.habitacion) {
      const t = setTimeout(irAlCalendario, 150);
      return () => clearTimeout(t);
    }
  }, [location]);

  const elegirHabitacion = (id) => {
    setHabitacionId(id);
    setTimeout(irAlCalendario, 50);
  };

  const cambiarDato = (campo) => (e) =>
    setDatos({ ...datos, [campo]: e.target.value });

  const confirmarReserva = (e) => {
    e.preventDefault();

    if (!habitacion) {
      alert("Primero elegí una habitación.");
      return;
    }
    if (!fechaEntrada || !fechaSalida) {
      alert("Seleccioná en el calendario la fecha de entrada y la de salida.");
      return;
    }
    if (noches < 1) {
      alert("La estadía debe ser de al menos una noche.");
      return;
    }

    const huespedes = Number(datos.adultos) + Number(datos.ninos);
    if (huespedes > habitacion.personas) {
      alert(
        `La ${habitacion.nombre} permite hasta ${habitacion.personas} persona(s). ` +
          `Elegí otra habitación o reducí la cantidad de huéspedes.`
      );
      return;
    }

    const codigo = "AUR-" + Math.floor(1000 + Math.random() * 9000);

    alert(
      `¡Reserva confirmada!\n\n` +
        `Código: ${codigo}\n` +
        `Huésped: ${datos.nombre} ${datos.apellido}\n` +
        `Documento: ${datos.documento}\n` +
        `Contacto: ${datos.email} · ${datos.telefono}\n\n` +
        `Habitación: ${habitacion.nombre}\n` +
        `Entrada: ${formatoFecha(fechaEntrada)}\n` +
        `Salida: ${formatoFecha(fechaSalida)}\n` +
        `Noches: ${noches}\n` +
        `Huéspedes: ${datos.adultos} adulto(s), ${datos.ninos} niño(s)\n` +
        `Hora de llegada: ${datos.llegada}\n` +
        `Total: ${formatoPrecio(total)}`
    );

    // Limpiar el formulario
    setHabitacionId(null);
    setRango([null, null]);
    setDatos(datosIniciales);
  };

  return (
    <div className="contenedor">
      <section className="reservas">
        <div className="reservas-intro">
          <p className="etiqueta">Reservas</p>
          <h1>Elegí tu habitación y tus fechas</h1>
        </div>

        {/* PASO 1: habitaciones */}
        <h2 className="paso">
          <span>1</span> Elegí una habitación
        </h2>
        <div className="grilla-habitaciones">
          {habitaciones.map((hab) => {
            const elegida = habitacionId === hab.id;
            return (
              <article
                key={hab.id}
                className={`habitacion ${elegida ? "elegida" : ""}`}
              >
                <div className="habitacion-imagen">
                  <img src={hab.imagen} alt={hab.nombre} />
                  <span className="habitacion-tag">
                    {formatoPrecio(hab.precio)} <small>/ noche</small>
                  </span>
                  {elegida && (
                    <span className="habitacion-elegida">
                      <IconoCheck /> Elegida
                    </span>
                  )}
                </div>

                <div className="habitacion-cuerpo">
                  <h3>{hab.nombre}</h3>
                  <p className="habitacion-desc">{hab.descripcion}</p>

                  <div className="habitacion-datos">
                    <span>{hab.capacidad}</span>
                    <span>{hab.cama}</span>
                  </div>

                  <ul className="habitacion-servicios">
                    {hab.servicios.map((s) => (
                      <li key={s}>
                        <IconoCheck /> {s}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`btn-elegir ${elegida ? "activo" : ""}`}
                    onClick={() => elegirHabitacion(hab.id)}
                  >
                    {elegida ? "Habitación elegida" : "Elegir esta habitación"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <form onSubmit={confirmarReserva}>
          {/* PASO 2: calendario */}
          <div ref={panelRef} className="ancla">
            <h2 className="paso">
              <span>2</span> Seleccioná las fechas
            </h2>
          </div>

          <div className="panel-reserva">
            <div className="calendario">
              <DatePicker
                selectsRange
                startDate={fechaEntrada}
                endDate={fechaSalida}
                onChange={(fechas) => setRango(fechas)}
                minDate={new Date()}
                locale="es"
                inline
              />
              <p className="calendario-ayuda">
                Hacé clic en la fecha de entrada y luego en la de salida.
              </p>
            </div>

            <div className="resumen">
              <div className="resumen-foto">
                {habitacion ? (
                  <img src={habitacion.imagen} alt={habitacion.nombre} />
                ) : (
                  <span>Todavía no elegiste una habitación</span>
                )}
              </div>

              <div className="resumen-cuerpo">
                <h3>{habitacion ? habitacion.nombre : "Tu reserva"}</h3>

                <dl>
                  <div>
                    <dt>Entrada</dt>
                    <dd>{fechaEntrada ? formatoFecha(fechaEntrada) : "—"}</dd>
                  </div>
                  <div>
                    <dt>Salida</dt>
                    <dd>{fechaSalida ? formatoFecha(fechaSalida) : "—"}</dd>
                  </div>
                  <div>
                    <dt>Noches</dt>
                    <dd>{noches > 0 ? noches : "—"}</dd>
                  </div>
                </dl>

                <div className="resumen-total">
                  <span>Total</span>
                  <strong>{total > 0 ? formatoPrecio(total) : "—"}</strong>
                </div>

                <ul className="resumen-notas">
                  <li>
                    <IconoCheck /> Cancelación gratuita hasta 48 h antes
                  </li>
                  <li>
                    <IconoCheck /> Desayuno incluido
                  </li>
                  <li>
                    <IconoCheck /> Check-in 14:00 · Check-out 10:00
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PASO 3: datos del huésped */}
          <h2 className="paso">
            <span>3</span> Datos del huésped
          </h2>
          <div className="panel-datos">
            <div className="campos">
              <label className="campo">
                Nombre
                <input
                  type="text"
                  value={datos.nombre}
                  onChange={cambiarDato("nombre")}
                  placeholder="Tu nombre"
                  required
                />
              </label>

              <label className="campo">
                Apellido
                <input
                  type="text"
                  value={datos.apellido}
                  onChange={cambiarDato("apellido")}
                  placeholder="Tu apellido"
                  required
                />
              </label>

              <label className="campo">
                DNI o pasaporte
                <input
                  type="text"
                  value={datos.documento}
                  onChange={cambiarDato("documento")}
                  placeholder="Número de documento"
                  required
                />
              </label>

              <label className="campo">
                Teléfono
                <input
                  type="tel"
                  value={datos.telefono}
                  onChange={cambiarDato("telefono")}
                  placeholder="Ej: 387 000 0000"
                  required
                />
              </label>

              <label className="campo ancho">
                Correo electrónico
                <input
                  type="email"
                  value={datos.email}
                  onChange={cambiarDato("email")}
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </label>

              <label className="campo">
                Adultos
                <select value={datos.adultos} onChange={cambiarDato("adultos")}>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                Niños
                <select value={datos.ninos} onChange={cambiarDato("ninos")}>
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo ancho">
                Hora estimada de llegada
                <select value={datos.llegada} onChange={cambiarDato("llegada")}>
                  {horasLlegada.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo ancho">
                Comentarios o pedidos especiales
                <textarea
                  rows="3"
                  value={datos.comentarios}
                  onChange={cambiarDato("comentarios")}
                  placeholder="Alergias, cama extra, cuna, celebración especial..."
                />
              </label>
            </div>

            <label className="check">
              <input
                type="checkbox"
                checked={datos.acepto}
                onChange={(e) =>
                  setDatos({ ...datos, acepto: e.target.checked })
                }
                required
              />
              Acepto las condiciones de reserva y la política de cancelación.
            </label>

            <button type="submit" className="btn-confirmar">
              Confirmar reserva
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Reservas;