import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MiCuenta.css";

function MiCuenta({ usuarioActivo }) {
  const [bandera, setBandera] = useState("");

  useEffect(() => {
    console.log("banana" + usuarioActivo.id);
    if (usuarioActivo.rol === true) {
      setBandera("Administrador");
    } else {
      setBandera("Usuario");
    }
  }, []);

  const id = usuarioActivo.id;
  const nombre = usuarioActivo.nombreUsuario;
  const email = usuarioActivo.email;

  return (
    <div className="minHeader px-5 mx-5">
      <div className="mi-cuenta-container ">
        <div className="usuario-info">
          <h2>Mi Cuenta</h2>
          <p>
            <strong>Nombre:</strong> {nombre}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Rango:</strong> {bandera}
          </p>
        </div>
        <div className="botones-container">
          <Link to={`lista-de-deseos/${id}`}>
            <Button variant="success px-3">Mi Lista de Deseos</Button>
          </Link>

          <Link to={`administrador-resenias/${id}`}>
            <Button variant="success ">Administrar Reseñas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MiCuenta;
