import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function ItemResenia({ dato, handleEliminarClick }) {
  return (
    <>
      <tr>
        <td className="">{dato.Resenia}</td>
        <td className="d-none d-md-table-cell">{dato.Juego}</td>
        <td className="d-none d-md-flex justify-content-center">
          <img className='img-item'  src={dato.Imagen} alt={dato.nombreJuego} />
        </td>
        <td>
          <div>
            <Button variant="danger" className="button-size mb-2" onClick={()=>{handleEliminarClick(dato.idResenia, dato.Juego)}}>
              Eliminar
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ItemResenia;
