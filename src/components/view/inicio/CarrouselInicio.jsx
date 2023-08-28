import React, { useState, useEffect } from "react";
import { listarJuegos } from "../../helpers/queries";
import Carousel from "react-bootstrap/Carousel";
import "./CarrouselInicio.css";

function CarrouselInicio() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    listarJuegos()
      .then((listajuegos) => {
        setJuegos(listajuegos);
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });
  }, []);

  return (
    <div className="carrousel-container">
      <div className="image-container">
        <img
          src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-91dc9490f14942ad5eeef278eb3ef4a6"
          alt="img-inicio"
          onError={(e) => {
            e.target.src = "https://i.stack.imgur.com/lnYep.png";
          }}
        />
      </div>
      <div className="overlay"></div>
    </div>
  );
}

export default CarrouselInicio;
