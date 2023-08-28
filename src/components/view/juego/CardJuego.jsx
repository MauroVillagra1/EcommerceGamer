import React, { useState, useEffect } from "react";
import { ListGroup, Card, Pagination, Button } from "react-bootstrap";
import "./CardJuego.css";
import { Link } from "react-router-dom";

function CardJuego({ juegos }) {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJuegos = juegos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="result-none">
      {" "}
      <>
        {currentJuegos.length === 0 ? (
          <p className="result-none">No se encontraron resultados</p>
        ) : (
          <div className="d-flex flex-wrap justify-content-center card-page-body">
            {currentJuegos.map((juego) => (
              <Card
                className="mx-3 Nav-link"
                key={juego.id}
                style={{ width: "18rem" }}
              >
                <Card.Img className="h-100" variant="top" src={juego.imagen}  onError={(e) => {
                  e.target.src = 'https://i.stack.imgur.com/lnYep.png';
                }} />
                <Card.Body className="card-body-size d-flex flex-column justify-content-center">
                  <div className="d-flex justify-content-between">
                    <Card.Text>{juego.nombreJuego}</Card.Text>
                    <Card.Title className="custom-card-size">
                      {"$" + juego.precio}
                    </Card.Title>
                  </div>
                  <Link className="w-100" to={"/ComprarJuego/" + juego.id}>
                    <Button variant="danger" className="mb-1 w-100">
                      Comprar
                    </Button>
                  </Link>
                  <Link className="w-100" to={"/detalle/"+juego.id}>
                  <Button variant="warning" className="mb-1 w-100">
                    Ver más
                  </Button>
                  </Link>
                  
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        {currentJuegos.length > 0 && (
          <Pagination className="d-flex justify-content-center mt-5">
            {Array.from({
              length: Math.ceil(juegos.length / itemsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </>
    </div>
  );
}

export default CardJuego;
