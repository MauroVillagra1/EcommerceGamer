import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardAnuncioRegistro.css";

function CardAnuncioRegistro() {
  return (
    <div className="w-100 d-flex h-100 my-3 justify-content-center align-items-center">
      <div className="w-50 d-flex justify-content-center align-items-center">
        <img
          className="w-50"
          src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5599d0d810824279/6036ca30ce4a0d12c3ec1dfa/V_AGENTS_587x900_Astra.png"
          alt="anuncio-img"
          onError={(e) => {
            e.target.src = "https://i.stack.imgur.com/lnYep.png";
          }}
        />
      </div>
      <div className="d-flex h-100 flex-column w-50 body-card-top">
        <h3>Recuerda Registrarte</h3>
        <Link to={"/registro"}>
          <Button variant="success">Registrate Dando Click Aqui</Button>
        </Link>
      </div>
    </div>
  );
}

export default CardAnuncioRegistro;
