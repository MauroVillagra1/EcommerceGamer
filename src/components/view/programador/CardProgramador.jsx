import React, { useEffect, useState } from "react";
import { listarProgramador } from "../../helpers/queries";
import "./CardProgramador.css";

function CardProgramador() {
  const [programadores, setProgramadores] = useState([]);
  useEffect(() => {
    listarProgramador().then((respuesta) => {
      setProgramadores(respuesta);
    });
  }, []);

  return (
    <>
      {programadores.map((programador, index) => (
        <div key={index}>
          <div className="card-body-programador">
            <img
              className="imagen-programador"
              src={programador.imagen}
              alt={programador.nombreProgramador}
              onError={(e) => {
                e.target.src = "https://i.stack.imgur.com/lnYep.png";
              }}
            />
            <div className="content-programador">
              <h3 className="name-programador">
                {programador.nombreProgramador}
              </h3>
              <p className="age-programador">{programador.edad} Años</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CardProgramador;
