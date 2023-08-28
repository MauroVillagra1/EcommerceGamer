import React, { useEffect, useState } from "react";
import "./ComprarJuego.css";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  CrearjuegosStorage,
  eliminarjuegosStorage,
  listarJuegosStorage,
  obtenerJuego,
} from "../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function ComprarJuego({ usuarioActivo }) {
  const [juego, setJuego] = useState("");
  const [categoria, setCategoria] = useState("");
  const [procesador, setProcesador] = useState("");
  const [sistemaoperativo, setSistemaOperativo] = useState("");
  const [tarjetagrafica, setTarjetaGrafica] = useState("");
  const [juegostorage, setJuegoStorage] = useState([]);
  var banderaJuegoStorage = false;
  var banderaJuegoStorage2 = false;

  const { id } = useParams();

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
      listarJuegosStorage().then((listaxd) => {
        setJuegoStorage(listaxd);
      });
    });
  }, []);

  const añadirAlCarrito = () => {
    if (usuarioActivo.id !== 0) {
      juegostorage.map((JuegoBuscado) => {
        if (
          parseInt(JuegoBuscado.idJuego) === parseInt(id) &&
          parseInt(JuegoBuscado.idUsuario) === parseInt(usuarioActivo.id)
        ) {
          banderaJuegoStorage = true;
        }
      });
      if (banderaJuegoStorage === false) {
        CrearjuegosStorage(id, usuarioActivo.id);
        Swal.fire("Juego Añadido a tu lista de deseos");
        listarJuegosStorage().then((listaxd) => {
          setJuegoStorage(listaxd);
        });
      } else {
        Swal.fire("Ya posees este Juego en tu lista de deseos");
      }
    } else {
      Swal.fire("Debes iniciar Sesion");
    }
  };

  const QuitarDelCarrito = () => {
    console.log(usuarioActivo.id);
    if (usuarioActivo.id !== 0) {
      var EliminarJuego = 0;
      juegostorage.map((JuegoBuscado) => {
        if (
          parseInt(JuegoBuscado.idJuego) === parseInt(id) &&
          parseInt(JuegoBuscado.idUsuario) === parseInt(usuarioActivo.id)
        ) {
          banderaJuegoStorage2 = true;
          EliminarJuego = JuegoBuscado.id;
        }
      });
      if (banderaJuegoStorage2 === true && EliminarJuego !== 0) {
        eliminarjuegosStorage(EliminarJuego);
        Swal.fire("Juego Eliminado de tu lista de deseos");
        listarJuegosStorage().then((listaxd) => {
          setJuegoStorage(listaxd);
        });
      } else {
        Swal.fire("No posees este Juego en tu lista de deseos");
      }
    } else {
      Swal.fire("Debes iniciar Sesion");
    }
  };
  return (
    <div className="body-detalle">
      <div className="card-juego row">
        <div className="img-juego col-lg-6">
          <img
            src={juego.imagen}
            alt="imagen juego"
            onError={(e) => {
              e.target.src = "https://i.stack.imgur.com/lnYep.png";
            }}
          />
        </div>
        <div className="info-card col-lg-6">
          <div className="d-flex titulo-precio">
            <section className="Titulo">
              <h4>{juego.nombreJuego}</h4>
            </section>
            <section className="Precio">
              <h3>${juego.precio}</h3>
            </section>
          </div>

          <section className="Categoria my-2">
            <h4>Categorias: {categoria}</h4>
          </section>

          <section className="d-flex aling-item-baseline my-2">
            <h5>Requerimientos del sistema:</h5>
          </section>
          <section className="d-flex flex-column mb-3">
            {" "}
            <span>Memoria ram: {juego.memoriaRam} G</span>
            <span>Disco Duro: {juego.espacioDiscoDuro} G</span>
            <span>Procesador: {procesador}</span>
            <span>Sistema Operativo: {sistemaoperativo}</span>
            <span>Tarjeta Grafica: {tarjetagrafica}</span>
          </section>

          <section className="d-flex justify-content-center mt-3 content-button flex-column">
            <Button
              className="mb-2 mt-4 custom-button"
              type="submit"
              variant="warning"
              onClick={añadirAlCarrito}
            >
              <div className="button-content">
                Añadir al carrito
                <img
                  className="img-carrito"
                  src="https://cdn.icon-icons.com/icons2/606/PNG/512/shopping-cart-add-button_icon-icons.com_56132.png"
                  alt="carrito"
                  onError={(e) => {
                    e.target.src = "https://i.stack.imgur.com/lnYep.png";
                  }}
                />
              </div>
            </Button>
            <Button
              className="custom-button"
              type="submit"
              variant="danger"
              onClick={QuitarDelCarrito}
            >
              <div className="button-content">
                Quitar del Carrito
                <img
                  className="img-carrito"
                  src="https://cdn.icon-icons.com/icons2/606/PNG/512/shopping-cart-add-button_icon-icons.com_56132.png"
                  alt="carrito"
                  onError={(e) => {
                    e.target.src = "https://i.stack.imgur.com/lnYep.png";
                  }}
                />
              </div>
            </Button>
          </section>
        </div>
      </div>
      {/* Componente de reseña */}
    </div>
  );
}

export default ComprarJuego;
