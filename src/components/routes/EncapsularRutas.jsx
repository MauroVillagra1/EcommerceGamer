import React from "react";
import { Navigate } from "react-router-dom";

const EncapsularRutas = ({ children }) => {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("usuarioLogeado")) || 0;
  if (usuarioLogueado.id !== 0 && usuarioLogueado.rol === true) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default EncapsularRutas;
