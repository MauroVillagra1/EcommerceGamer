import React, { useEffect, useState } from "react";
import { listaresenias } from "../helpers/queries";
import "./Resenia.css";
function Resenia({ juegoLog }) {
  const [resenias, setResenias] = useState([]);
  const [reseniasFiltradas, setReseniasFiltradas] = useState([]);

  useEffect(() => {
    listaresenias().then((respuesta) => {
      setResenias(respuesta);
    });
  }, []);

  useEffect(() => {
    const reseniaFiltrada = resenias.filter(
      (resenia) => parseInt(resenia.idJuego) === parseInt(juegoLog)
    );
    setReseniasFiltradas(reseniaFiltrada);
  }, [juegoLog, resenias]);

  return (
    <>
      <div className="content-coment">
        {reseniasFiltradas.map((reseniafiltrada) => (
          <div
            key={reseniafiltrada.id}
            className="d-flex mb-5 content-individual-coment"
          >
            <div className="d-flex flex-column text-center mb-5 img-space">
              <img
                className="img-usuario"
                src="https://us.123rf.com/450wm/get4net/get4net1902/get4net190209043/125446708-usuario-anónimo-sin-rostro.jpg"
                alt="img-resenia"
                onError={(e) => {
                  e.target.src = "https://i.stack.imgur.com/lnYep.png";
                }}
              />
              <p>{reseniafiltrada.nombreUsuario}</p>
            </div>
            <div className="coment">
              <span>{reseniafiltrada.resenia}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Resenia;
