import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { crearResenias, obtenerJuego } from "../helpers/queries";
import "./DetalleJuego.css";
import Resenia from "./Resenia.jsx";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import StarRating from "./StarRating";
import { Button } from "react-bootstrap";

const DetalleJuego = ({ usuarioActivo }) => {
  const [juego, setJuego] = useState("");
  const [categoria, setCategoria] = useState("");
  const [procesador, setProcesador] = useState("");
  const [sistemaoperativo, setSistemaOperativo] = useState("");
  const [tarjetagrafica, setTarjetaGrafica] = useState("");

  const handleRatingChange = (value) => {
    console.log("Calificación seleccionada:", value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();

  const onSubmit = (datos) => {
    datos["idJuego"] = parseInt(id);
    datos["idUsuario"] = parseInt(usuarioActivo.id);
    datos["nombreUsuario"] = usuarioActivo.nombreUsuario;

    console.log("hola" + usuarioActivo);

    crearResenias(datos)
      .then((respuesta) => {
        console.log(datos);
        console.log("respuesta: " + respuesta.status);
        if (respuesta.status === 201) {
          Swal.fire(
            "Comentario Publicado",
            "Gracias por brindarnos su opinión",
            "success"
          );
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Hubo un error", "Error al publicar el Comentario", "error");
      });
  };

  useEffect(() => {
    obtenerJuego(id).then((resp) => {
      const variable = resp;
      setJuego(variable);
      const categoriaId = resp.categorias[0].categoria;
      const procesadorId = resp.procesadores[0].procesador;
      const sistemaOperativoId = resp.sistemasOperativos[0].sistemaOperativo;
      const tarjetaGraficaId = resp.tarjetasGraficas[0].tarjetaGrafica;
      setCategoria(categoriaId);
      setProcesador(procesadorId);
      setSistemaOperativo(sistemaOperativoId);
      setTarjetaGrafica(tarjetaGraficaId);
    });
  }, []);

  return (
    <>
      <div className="my-3 bg-dark body-detalles">
        <div className="bg-dark">
          <div className="row">
            <div className="col-xl-6 imagen-content mb-5">
              <img
                className="mt-5 imagen-content"
                src={juego.imagen}
                alt="Img-game"
                onError={(e) => {
                  e.target.src = "https://i.stack.imgur.com/lnYep.png";
                }}
              />
            </div>
            <div className="col-xl-6 mt-5">
              <div className="card-body">
                <div className="text-light mt-4">
                  <h1>{juego.nombreJuego}</h1>
                  <hr />
                  <div className="text-light description-content">
                    <h5>{juego.descripcion}</h5>
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex mt-5 flex-wrap flex-column text-center">
            {" "}
            <span className="fw-semibold mx-1">
              <h3>Categoria: {categoria}</h3>
            </span>
            <br />
            <span className="fw-semibold mx-1">
              <h3>Desarrollador: {juego.desarrollador}</h3>
            </span>
            <br />
            <span className="fw-semibold mx-1">
              <h3>Fecha Lanzamiento: {juego.fechaDeLanzamiento}</h3>
            </span>
            <br />
            <span className="fw-semibold mx-1">
              <h3>Precio: ${juego.precio}</h3>
            </span>
          </div>
          <div className="text-light mt-4 d-flex flex-column text-center mb-5">
            <h2>Requisitos del Juego</h2>{" "}
            <span className="fw-semibold">
              <h5>Memoria Ram: {juego.memoriaRam} G</h5>
            </span>
            <span className="fw-semibold">
              <h5>Disco Duro: {juego.espacioDiscoDuro} G</h5>
            </span>
            <span className="fw-semibold">
              <h5>Procesador: {procesador} G</h5>
            </span>
            <span className="fw-semibold">
              <h5>Sistema Operativo: {sistemaoperativo} G</h5>
            </span>
            <span className="fw-semibold">
              <h5>Tarjeta Grafica: {tarjetagrafica} G</h5>
            </span>
          </div>
          <div className="text-center">
            <h1>Sistema de Calificación</h1>
            <StarRating
              onChange={handleRatingChange}
              usuarioActivo={usuarioActivo}
              idJuego={id}
            />
          </div>
        </div>
      </div>
      <div className="bg-dark">
        {usuarioActivo.id !== 0 ? (
          <>
            <div className="Title mb-5">
              <h2>Reseñas de {juego.nombreJuego}</h2>
            </div>
            <div className="d-flex mb-5 content-coment">
              <div className="d-flex flex-column align-items-center">
                <img
                  className="img-usuario "
                  src="https://us.123rf.com/450wm/get4net/get4net1902/get4net190209043/125446708-usuario-anónimo-sin-rostro.jpg"
                  alt="img-usuario"
                  onError={(e) => {
                    e.target.src = "https://i.stack.imgur.com/lnYep.png";
                  }}
                />
                <p>{usuarioActivo.nombreUsuario}</p>
              </div>
              <div className="coment-user w-100">
                <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group coment">
                    <textarea
                      className="form-control"
                      placeholder="Ingrese un Comentario"
                      {...register("resenia", {
                        minLength: {
                          value: 20,
                          message: "Debe ingresar como mínimo 20 caracteres",
                        },
                        maxLength: {
                          value: 500,
                          message: "Debe ingresar como máximo 500 caracteres",
                        },
                      })}
                    />
                  </div>
                  <Button className="mb-5" type="submit" variant="success">
                    Publicar
                  </Button>
                </form>
              </div>
            </div>
            <Resenia juegoLog={id}></Resenia>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DetalleJuego;
