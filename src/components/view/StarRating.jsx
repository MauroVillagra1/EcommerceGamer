import React, { useEffect, useState } from "react";
import {
  crearPuntuacion,
  editarPuntuacion,
  listarPuntuacion,
} from "../helpers/queries";
import Swal from "sweetalert2";

function StarRating({ onChange, usuarioActivo, idJuego }) {
  const [rating, setRating] = useState(0);
  const [ratingactual, setRatingActual] = useState([]);
  const [puntuacionactual, setPuntuacionActual] = useState({});
  const [resultado, setResultado] = useState("Muy Malo");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    listarPuntuacion().then((respuesta) => {
      setRatingActual(respuesta);
    });
  }, []);

  const calcularTotal = () => {
    let totalPuntuaciones = 0;
    var x = 0;

    ratingactual.forEach((ratingBuscado) => {
      if (ratingBuscado.idJuego === parseInt(idJuego)) {
        x = x + 1;
        totalPuntuaciones += ratingBuscado.puntuacionJuego;
      }
    });
    var datos = {
      total: totalPuntuaciones,
      cont: x,
    };
    return datos;
  };

  useEffect(() => {
    const totalPuntuaciones = calcularTotal();
    const promedio =
      ratingactual.length > 0
        ? totalPuntuaciones.total / totalPuntuaciones.cont
        : 0;
    console.log(totalPuntuaciones.total, totalPuntuaciones.cont);
    setTotal(promedio.toFixed(2));

    if (total <= 1.8) {
      setResultado("Muy Malo");
    } else if (total <= 2.6) {
      setResultado("Malo");
    } else if (total <= 3.4) {
      setResultado("Regular");
    } else if (total <= 4.2) {
      setResultado("Bueno");
    } else {
      setResultado("Muy Bueno");
    }
  }, [ratingactual, total]);

  useEffect(() => {
    const userRating = ratingactual.find(
      (ratingBuscado) => ratingBuscado.idJuego === parseInt(idJuego)
    );

    if (userRating) {
      setRating(userRating.puntuacionJuego);
      setPuntuacionActual(userRating);
    }
  }, [ratingactual, idJuego, usuarioActivo]);

  const handleStarClick = (value) => {
    if (usuarioActivo.id !== 0) {
      const newData = {
        idJuego: parseInt(idJuego),
        idUsuario: usuarioActivo.id,
        puntuacionJuego: value,
      };

      if (rating === 0) {
        crearPuntuacion(newData);
      } else {
        editarPuntuacion(puntuacionactual.id, newData);
        onChange(value);
      }

      setRating(value);
      const updatedRatings = ratingactual.map((ratingBuscado) =>
        ratingBuscado.id === puntuacionactual.id
          ? { ...ratingBuscado, puntuacionJuego: value }
          : ratingBuscado
      );
      setRatingActual(updatedRatings);
    } else {
      Swal.fire("Debes iniciar Sesion");
    }
  };

  return (
    <>
      <div className="mb-5 minHeader">
        <p>Calificación: {rating}</p>
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              className="display-4"
              key={value}
              onClick={() => handleStarClick(value)}
              style={{
                cursor: "pointer",
                color: value <= rating ? "gold" : "gray",
                fontSize: "24px",
              }}
            >
              <p className="d-inline display-4 ">★</p>
            </span>
          ))}
        </div>
      </div>
      <div>Total: {resultado}</div>
    </>
  );
}

export default StarRating;
