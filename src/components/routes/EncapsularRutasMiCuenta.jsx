import React from "react";
import { Navigate } from "react-router-dom";

const EncapsularRutasMiCuenta = ({ children }) => {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("usuarioLogeado")) || null;
  if (usuarioLogueado !== null) {
    if (usuarioLogueado.id !== 0) {
      return children;
    } else {
      console.log("xd" + usuarioLogueado.id);

      return <Navigate to={"/"}></Navigate>;
    }
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default EncapsularRutasMiCuenta;
