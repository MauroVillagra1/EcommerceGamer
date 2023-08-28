import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ItemResenia from "./micuenta/ItemResenia";
import { useParams } from "react-router-dom";
import {
  eliminarResenias,
  listarJuegos,
  listaresenias,
} from "../helpers/queries";

import Swal from "sweetalert2";

function AdministradorResenias() {
  const [resenias, setResenias] = useState([]);
  const [listaderesenias, setListaDeResenias] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const { idUsuarioActivo } = useParams();

  useEffect(() => {
    listaresenias().then((respuesta) => {
      setResenias(respuesta);
    });
    listarJuegos().then((respuesta) => {
      setJuegos(respuesta);
    });
  }, []);

  useEffect(() => {
    var Datospush = [];
    var Datos = [];
    resenias.map((resenia) => {
      juegos.map((juego) => {
        if (
          resenia.idUsuario === parseInt(idUsuarioActivo) &&
          juego.id === resenia.idJuego
        ) {
          Datos = {
            idResenia: resenia.id,
            Resenia: resenia.resenia,
            Juego: juego.nombreJuego,
            Imagen: juego.imagen,
          };
          Datospush.push(Datos);
        }
      });
    });
    setListaDeResenias(Datospush);
    console.log(Datos);
  }, [resenias, idUsuarioActivo, juegos]);

  const reload = () => {
    listaresenias().then((respuesta) => {
      setResenias(respuesta);
    });
    listarJuegos().then((respuesta) => {
      setJuegos(respuesta);
    });
    var Datospush = [];
    var Datos = [];
    resenias.map((resenia) => {
      juegos.map((juego) => {
        if (
          resenia.idUsuario === parseInt(idUsuarioActivo) &&
          juego.id === resenia.idJuego
        ) {
          Datos = {
            idResenia: resenia.id,
            Resenia: resenia.resenia,
            Juego: juego.nombreJuego,
            Imagen: juego.imagen,
          };
          Datospush.push(Datos);
        }
      });
    });
  };

  const handleEliminarClick = (datoid, datonombre) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el Comentario que realizaste al juego ${datonombre}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarResenias(datoid)
          .then((resp) => {
            console.log(resp.status);
            if (resp.status === 200) {
              Swal.fire(
                "Comentario Eliminado",
                "Su Comentario fue eliminado correctamente",
                "success"
              );
            }
            reload();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Hubo un error",
              "Error al intentar eliminar el Comentario",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <section className="container mainSection minHeader">
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h1 className="display-4 ">Comentarios Realizados</h1>
        </div>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th className="movile-adapt">Resenia</th>
              <th className="d-none d-md-table-cell">Juego</th>
              <th className="d-none d-md-table-cell">Imagen</th>
              <th className="movile-adapt">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {listaderesenias.map((dato) => (
              <ItemResenia
                key={dato.idResenia}
                dato={dato}
                {...dato}
                handleEliminarClick={handleEliminarClick}
              />
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
}

export default AdministradorResenias;
