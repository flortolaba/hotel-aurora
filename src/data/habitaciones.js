import hab1 from "../assets/habitacion1.png";
import hab2 from "../assets/habitacion2.png";
import hab3 from "../assets/habitacion3.png";
import hab4 from "../assets/habitacion4.png";

const habitaciones = [
  {
    id: 1,
    nombre: "Habitación Individual",
    descripcion:
      "Un espacio sereno y funcional, ideal para viajes de trabajo o descanso en solitario.",
    capacidad: "1 persona",
    personas: 1,
    cama: "Cama de 1 plaza y media",
    precio: 45000,
    servicios: ["Wi-Fi", "Aire acondicionado", "Escritorio"],
    imagen: hab1,
  },
  {
    id: 2,
    nombre: "Habitación Doble",
    descripcion:
      "Luminosa y confortable, con una cama king y escritorio junto a la ventana.",
    capacidad: "2 personas",
    personas: 2,
    cama: "Cama king size",
    precio: 65000,
    servicios: ["Wi-Fi", "Aire acondicionado", "Minibar"],
    imagen: hab2,
  },
  {
    id: 3,
    nombre: "Habitación Familiar",
    descripcion:
      "Amplia y cálida, pensada para compartir con comodidad en familia.",
    capacidad: "4 personas",
    personas: 4,
    cama: "1 cama queen y 2 individuales",
    precio: 90000,
    servicios: ["Wi-Fi", "Aire acondicionado", "Smart TV"],
    imagen: hab3,
  },
  {
    id: 4,
    nombre: "Suite Aurora",
    descripcion:
      "Nuestra mejor habitación: sala de estar, baño con bañera y vista panorámica.",
    capacidad: "2 personas",
    personas: 2,
    cama: "Cama king size premium",
    precio: 130000,
    servicios: ["Wi-Fi", "Bañera", "Minibar", "Vista panorámica"],
    imagen: hab4,
  },
];

export default habitaciones;