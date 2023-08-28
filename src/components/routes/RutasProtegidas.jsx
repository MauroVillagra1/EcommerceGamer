import React from "react";
import { Routes, Route } from "react-router-dom";
import Administrador from "../view/Administrador";
import CrearJuego from "../view/juego/CrearJuego";
import EditarJuego from "../view/juego/EditarJuego";

function RutasProtegidas() {
  return (
    <Routes>
      <Route exact path="/" element={<Administrador></Administrador>}></Route>
      <Route exact path="/crear" element={<CrearJuego></CrearJuego>}></Route>
      <Route
        exact
        path="/editar/:id"
        element={<EditarJuego></EditarJuego>}
      ></Route>
    </Routes>
  );
}

export default RutasProtegidas;
