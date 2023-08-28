import { Table, Pagination, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { eliminarJuego, listarJuegos } from "../helpers/queries";
import ItemJuego from "./juego/ItemJuego";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Administrador = () => {
  const [juegos, setJuegos] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEliminarClick = (id, nombreJuego) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el juego ${nombreJuego}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarJuego(id)
          .then((resp) => {
            if (resp.status === 200) {
              Swal.fire(
                "Juego Eliminado",
                "Su Juego fue eliminado correctamente",
                "success"
              );
            }
            reload();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Hubo un error",
              "Error al intentar eliminar el juego",
              "error"
            );
          });
      }
    });
  };

  const reload = () => {
    listarJuegos()
      .then((listajuegos) => {
        setJuegos(listajuegos);
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJuegos = juegos.slice(startIndex, startIndex + itemsPerPage);
  useEffect(() => {
    listarJuegos()
      .then((listajuegos) => {
        setJuegos(listajuegos);
      })
      .catch((error) => {
        console.error("Error al obtener los juegos:", error);
      });
  }, []);

  return (
    <section className="container mainSection conteniner-administrador minHeader">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Juegos disponibles</h1>
        <Link to={"crear"}>
          {" "}
          <Button variant="success">Agregar Juego</Button>
        </Link>
      </div>
      <hr />
      <Table responsive striped bordered hover className="w-100">
        <thead>
          <tr>
            <th className="d-none d-md-table-cell">Codigo</th>
            <th className="movile-adapt">Juego</th>
            <th className="d-none d-md-table-cell">Precio</th>
            <th className="d-none d-xl-block">Imagen</th>
            <th className="d-none d-xl-table-cell">Categoria</th>
            <th className="movile-adapt">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {currentJuegos.map((juego) => (
            <ItemJuego
              key={juego.id}
              {...juego}
              handleEliminarClick={handleEliminarClick}
            ></ItemJuego>
          ))}
        </tbody>
      </Table>
      {currentJuegos.length > 0 && (
        <Pagination className="d-flex justify-content-center mt-5">
          {Array.from({ length: Math.ceil(juegos.length / itemsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      )}
    </section>
  );
};

export default Administrador;
