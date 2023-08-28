import React from "react";
import { Navigate } from "react-router-dom";

const EncapsularRutasRegistro = ({ children }) => {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("usuarioLogeado")) || null;
  if (usuarioLogueado === null) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default EncapsularRutasRegistro;
