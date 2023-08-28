import React, { useEffect, useState } from "react";
import { listarJuegos, listarJuegosStorage } from "../helpers/queries";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CardJuego from "./juego/CardJuego";

function ListaDeDeseos() {
  const [juegos, setJuegos] = useState([]);
  const [juegosstorage, setJuegosStorage] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);

  const { idUsuarioActivo } = useParams();

  useEffect(() => {
    listarJuegos()
      .then((listajuegos) => {
        setJuegos(listajuegos);
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });

    listarJuegosStorage().then((listaJuegosStore) => {
      setJuegosStorage(listaJuegosStore);
    });
  }, []);

  useEffect(() => {
    var juegoFiltrado1 = [];
    juegosstorage.map((BuscarJuegoStorage) => {
      juegos.map((juego) => {
        if (
          parseInt(BuscarJuegoStorage.idUsuario) ===
            parseInt(idUsuarioActivo) &&
          parseInt(BuscarJuegoStorage.idJuego) === parseInt(juego.id)
        ) {
          juegoFiltrado1.push(juego);
          console.log(juegoFiltrado1);
          setJuegosFiltrados(juegoFiltrado1);
        }
      });
    });
  }, [juegosstorage, juegos, idUsuarioActivo]);

  return (
    <div className="color-white minHeader p-4">
      <CardJuego juegos={juegosFiltrados}></CardJuego>
    </div>
  );
}

export default ListaDeDeseos;
