import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { eliminarJuego } from "../../helpers/queries";
import Swal from "sweetalert2";
import "./ItemJuego.css";

function ItemJuego({
  handleEliminarClick,
  id,
  nombreJuego,
  precio,
  imagen,
  fechaDeLanzamiento,
  categorias,
  memoriaRam,
  espacioDiscoDuro,
  procesadores,
  sistemasOperativos,
  tarjetasGraficas,
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (isDeleted) {
      console.log(`El juego con ID ${id} ha sido eliminado.`);
    }
  }, [isDeleted, id]);

  return (
    <tr>
      <td className="d-none d-md-table-cell">{id}</td>
      <td className="movile-adapt">{nombreJuego}</td>
      <td className="d-none d-md-table-cell">${precio}</td>
      <td className="d-none d-xl-flex justify-content-center content-img">
        <img
          className="img-item"
          src={imagen}
          alt={nombreJuego}
          onError={(e) => {
            e.target.src = "https://i.stack.imgur.com/lnYep.png";
          }}
        />
      </td>

      <td className="d-none d-xl-table-cell">
        {categorias.map((cat) => (
          <span key={cat.id}>{cat.categoria}, </span>
        ))}
      </td>

      <td>
        <div className="d-flex flex-column content-button movile-adapt button-size">
          <Link className="Button w-50 mb-2 button-size" to={"editar/" + id}>
            <Button variant="warning" className="button-editar button-size">
              Editar
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => {
              handleEliminarClick(id, nombreJuego);
            }}
            className="button-size mb-2"
          >
            Eliminar
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default ItemJuego;
