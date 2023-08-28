import React, { useEffect } from "react";
import "./CardTopJuegos.css";
import { ListGroup, Card, Pagination, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardTopJuegos({ juegos }) {
  const limitedJuegos = juegos.slice(0, 4);

  return (
    <>
      {limitedJuegos.map((juego, index) => (
        <Card className="mx-3 Nav-link Card-body" key={`${juego.id}-${index}`}>
          <Card.Img
            className="h-100 Card-img-body"
            variant="top"
            src={juego.imagen}
            onError={(e) => {
              e.target.src = "https://i.stack.imgur.com/lnYep.png";
            }}
            alt="Card-img"
          />
          <Card.Body className="card-body-size-2 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center conteiner-text">
              <Card.Text className="conteiner-text">
                {juego.nombreJuego}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default CardTopJuegos;
