import React from "react";
import CardJuego from "./juego/CardJuego";
import CarrouselInicio from "./inicio/CarrouselInicio";
import { set, useForm } from "react-hook-form";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  listarJuegos,
  listarCategorias,
  listarPuntuacion,
} from "../helpers/queries";
import "./Inicio.css";
import CardTopJuegos from "./juego/CardTopJuegos";
import CardAnuncioRegistro from "./anuncio/CardAnuncioRegistro";

function Inicio({ usuarioActivo }) {
  const [categorias, setCategorias] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [juegosfilter, setJuegosFilter] = useState([]);
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [topjuegos, setTopJuegos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    listarJuegos().then((resultado) => {
      setJuegos(resultado);
      setJuegosFilter(resultado);
    });
    listarCategorias().then((listacategorias) => {
      setCategorias(listacategorias);
    }),
      listarPuntuacion().then((respuesta) => {
        setPuntuaciones(respuesta);
      });
  }, []);

  const searchGames = (term) => {
    const filteredGames = juegos.filter((juego) =>
      juego.nombreJuego.toLowerCase().includes(term.toLowerCase())
    );
    setJuegosFilter(filteredGames);
  };

  useEffect(() => {
    MostrarTop();
  }, [juegos, puntuaciones]);

  const onSubmit = (datos) => {
    listarJuegos()
      .then((resultado) => {
        const NuevaListaJuegos = resultado;

        CompararDatos(NuevaListaJuegos, datos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function CompararDatos(NuevaListaJuegos, datos) {
    const juegosFiltrados = [];

    NuevaListaJuegos.forEach((Juego) => {
      Juego.categorias.forEach((categoria) => {
        if (parseInt(categoria.id) === parseInt(datos["categorias"])) {
          juegosFiltrados.push(Juego);
        }
      });
    });

    console.log("juegosFiltrados:", juegosFiltrados);
    if (parseInt(datos["categorias"]) === 0) {
      setJuegosFilter(NuevaListaJuegos);
    } else {
      setJuegosFilter(juegosFiltrados);
    }
  }

  const MostrarTop = () => {
    const datosCompilados = juegos
      .map((juego) => {
        let contador = 0;
        let puntacionIndividual = 0;
        for (const puntuacion of puntuaciones) {
          if (puntuacion.idJuego === juego.id) {
            puntacionIndividual += puntuacion.puntuacionJuego;
            contador++;
          }
        }

        if (puntacionIndividual > 0) {
          const datos = {
            idJuego: juego.id,
            nombreJuego: juego.nombreJuego,
            imagen: juego.imagen,
            precio: juego.precio,
            puntuacionJuego: (puntacionIndividual / contador).toFixed(2),
          };
          return datos;
        }
        return null;
      })
      .filter(Boolean);

    datosCompilados.sort((a, b) => b.puntuacionJuego - a.puntuacionJuego);
    setTopJuegos(datosCompilados);
  };

  const handleChange = (e) => {
    const selectedCategoria = e.target.value;
    onSubmit({ categorias: selectedCategoria });
  };

  return (
    <div className="body-search ">
      <CarrouselInicio></CarrouselInicio>
      <div className="bg-dark d-flex align-items-center mb-4">
        <div className="text-filtrar">Filtrar</div>
        <div>
          <Form>
            <FormGroup>
              <Form.Select
                className="select-option-categoria"
                {...register("categorias")}
                onChange={handleChange}
              >
                <option value="0">Seleccione una opción</option>

                {categorias.map((categoria, index) => (
                  <option
                    key={`categoria-${categoria.id}-${index}`}
                    value={categoria.id}
                  >
                    {categoria.categoria}
                  </option>
                ))}
              </Form.Select>
            </FormGroup>
          </Form>
        </div>
        <Form>
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchGames(e.target.value);
              }}
            />
          </FormGroup>
        </Form>
      </div>

      <CardJuego juegos={juegosfilter} />
      <div className="justify-content-center d-flex top-conteiner">
        <div className="d-flex bg-top">
          <div className="w-50 content-img-top">
            <img
              className="w-100 h-75"
              src="https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/b/b3/latest/20180612205232/Cloud_SSBU.png/1200px-Cloud_SSBU.png"
              alt="fondo-img"
              onError={(e) => {
                e.target.src = "https://i.stack.imgur.com/lnYep.png";
              }}
            />
          </div>
          <div className="w-50 d-flex flex-wrap content-cards-top">
            <div className="text-center w-100 mt-3 text-title-top">
              <h3 className="mt-5">Juegos Mejor Calificados</h3>
            </div>
            <div className="w-100 h-75 d-flex flex-wrap justify-content-center card-top">
              <CardTopJuegos juegos={topjuegos} />
            </div>
          </div>
        </div>
      </div>
      {usuarioActivo.id === 0 && (
        <div>
          <CardAnuncioRegistro />
        </div>
      )}
    </div>
  );
}

export default Inicio;
