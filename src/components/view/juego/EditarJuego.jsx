import React from "react";

import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  editarJuego,
  obtenerJuego,
  listarCategorias,
  listarProcesadores,
  listarSistemasOperativos,
  listarTarjetasGraficas,
} from "../../helpers/queries";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function EditarJuego() {
  const [categorias, setCategorias] = useState([]);
  const [procesadores, setProcesadores] = useState([]);
  const [sistemasoperativos, setSistemasOperativos] = useState([]);
  const [tarjetasgraficas, setTarjetasGraficas] = useState([]);
  const [juegos, setJuegos] = useState([]);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (datos) => {
    seleccionarObjeto(categorias, "categorias", datos);
    seleccionarObjeto(procesadores, "procesadores", datos);
    seleccionarObjeto(sistemasoperativos, "sistemasOperativos", datos);
    seleccionarObjeto(tarjetasgraficas, "tarjetasGraficas", datos);

    editarJuego(id, datos)
      .then((resp) => {
        console.log("aqui" + resp.status);
        if (resp.status === 200) {
          Swal.fire(
            "Juego Actualizado",
            "Su Juego se actualizo correctamente",
            "success"
          );
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Hubo un error",
          "Error al intentar actualizar el juego",
          "error"
        );
      });
  };

  function seleccionarObjeto(lista, campo, datos) {
    const seleccionado = lista.find(
      (item) => item.id === parseInt(datos[campo])
    );
    if (seleccionado) {
      datos[campo] = [seleccionado];
    }
  }

  function cargarinputs() {
    obtenerJuego(id).then((resp) => {
      const categoriaId = resp.categorias[0].id;
      const procesadorId = resp.procesadores[0].id;
      const sistemaOperativoId = resp.sistemasOperativos[0].id;
      const tarjetaGraficaId = resp.tarjetasGraficas[0].id;
      setValue("nombreJuego", resp.nombreJuego),
        setValue("precio", resp.precio),
        setValue("desarrollador", resp.desarrollador),
        setValue("imagen", resp.imagen),
        setValue("fechaDeLanzamiento", resp.fechaDeLanzamiento),
        setValue("descripcion", resp.descripcion),
        setValue("memoriaRam", resp.memoriaRam),
        setValue("espacioDiscoDuro", resp.espacioDiscoDuro),
        setValue("categorias", categoriaId),
        setValue("memoriaRam", resp.memoriaRam),
        setValue("espacioDiscoDuro", resp.espacioDiscoDuro),
        setValue("procesadores", procesadorId),
        setValue("sistemasOperativos", sistemaOperativoId),
        setValue("tarjetasGraficas", tarjetaGraficaId);
    });
  }

  useEffect(() => {
    cargarinputs();

    listarCategorias().then((listacategorias) => {
      setCategorias(listacategorias);
    }),
      listarProcesadores().then((listaprocesadores) => {
        setProcesadores(listaprocesadores);
      }),
      listarSistemasOperativos().then((listasistemasoperativos) => {
        setSistemasOperativos(listasistemasoperativos);
      }),
      listarTarjetasGraficas().then((listatarjetasgraficas) => {
        setTarjetasGraficas(listatarjetasgraficas);
      });
  }, []);

  return (
    <div className="mb-5">
      <section className="container mainSection">
        <h1 className="display-4 mt-5">Editar Juego</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreJuego">
            <Form.Label>Juego</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Mario Bros"
              {...register("nombreJuego", {
                required: "Este dato es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]*$/,
                  message: "Debe ingresar solo letras y números válidos",
                },
                minLength: {
                  value: 2,
                  message: "Debe ingresar como minimo 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Debe ingresar como maximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombreJuego?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Ej: 500.00"
              {...register("precio", {
                required: "Este dato es obligatorio",

                validate: (value) => {
                  const parsedValue = parseFloat(value);
                  if (isNaN(parsedValue)) {
                    return "Ingrese un número válido";
                  }
                  if (parsedValue < 0 || parsedValue > 100000) {
                    return "El precio debe estar entre 0 y 100000";
                  }
                  return true;
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.precio?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaLanzamiento">
            <Form.Label>Fecha de Lanzamiento</Form.Label>
            <Form.Control
              placeholder="01-01-2000"
              {...register("fechaDeLanzamiento", {
                required: "Este dato es obligatorio",
                pattern: {
                  value: /^(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
                  message: "Debe ingresar una fecha en el formato dd-mm-yyyy",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.fechaDeLanzamiento?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDesarrollador">
            <Form.Label>Desarrollador</Form.Label>
            <Form.Control
              placeholder="Ingrese el nombre de la persona o empresa desarrolladora"
              {...register("desarrollador", {
                required: "Este dato es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]*$/,
                  message: "Debe ingresar solo letras y números válidos",
                },
                minLength: {
                  value: 2,
                  message: "Debe ingresar como minimo 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Debe ingresar como maximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.desarrollador?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripcion</Form.Label>
            <textarea
              className="form-control"
              placeholder="Ingrese una descripcion breve del juego, no mayor a 500 caracteres"
              {...register("descripcion", {
                required: "Este dato es obligatorio",

                minLength: {
                  value: 20,
                  message: "Debe ingresar como minimo 20 caracteres",
                },
                maxLength: {
                  value: 500,
                  message: "Debe ingresar como maximo 500 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.descripcion?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategoria">
            <Form.Label>Categoria*</Form.Label>
            <Form.Select
              {...register("categorias", {
                validate: (value) =>
                  value !== "" || "Debe seleccionar una categoría",
                required: "Debe seleccionar una categoria",
              })}
            >
              <option value="">Seleccione una opcion</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.categoria}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.categorias?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imagen URL*</Form.Label>
            <Form.Control
              placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
              {...register("imagen", {
                required: "La url de la imagen es obligatoria",
                pattern: {
                  value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                  message: "Debe ingresar una URL valida",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.imagen?.message}
            </Form.Text>
          </Form.Group>

          <Form.Label>
            <h3>Requerimiento del sistema</h3>
          </Form.Label>
          <Form.Group className="mb-3" controlId="formRam">
            <Form.Label>Memoria Ram (Introducir valor en Gigas) </Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Ej: 8"
                {...register("memoriaRam", {
                  required: "Este dato es obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Ingrese un número entero válido",
                  },
                  validate: {
                    validNumber: (value) => {
                      const parsedValue = parseInt(value);
                      if (isNaN(parsedValue)) {
                        return "Ingrese un número válido";
                      }
                      if (parsedValue <= 2 || parsedValue >= 1024) {
                        return "El número debe ser mayor a 2 y menor a 1024";
                      }
                      return true;
                    },
                  },
                })}
              />
              <div className="input-group-append">
                <span className="input-group-text">G</span>
              </div>
            </div>
            <Form.Text className="text-danger">
              {errors.memoriaRam?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDisco">
            <Form.Label>Disco Duro</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                placeholder="Ej: 128G"
                {...register("espacioDiscoDuro", {
                  required: "Este dato es obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Ingrese un número entero válido",
                  },
                  validate: {
                    validNumber: (value) => {
                      const parsedValue = parseInt(value);
                      if (isNaN(parsedValue)) {
                        return "Ingrese un número válido";
                      }
                      if (parsedValue <= 16 || parsedValue >= 4096) {
                        return "El número debe ser mayor a 16 y menor a 4096";
                      }
                      return true;
                    },
                  },
                })}
              />
              <div className="input-group-append">
                <span className="input-group-text">G</span>
              </div>
            </div>
            <Form.Text className="text-danger">
              {errors.espacioDiscoDuro?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProcesador">
            <Form.Label>Procesador</Form.Label>
            <Form.Select
              {...register("procesadores", {
                validate: (value) =>
                  value !== "" || "Debe seleccionar un Procesador",
                required: "Debe seleccionar un Procesador",
              })}
            >
              <option value="">Seleccione una opcion</option>
              {procesadores.map((procesador) => (
                <option key={procesador.id} value={procesador.id}>
                  {procesador.procesador}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.procesadores?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSistemaOperativo">
            <Form.Label>Sistema Operativo</Form.Label>
            <Form.Select
              {...register("sistemasOperativos", {
                validate: (value) =>
                  value !== "" || "Debe seleccionar un Sistema Operativo",
                required: "Debe seleccionar un Sistema Operativo",
              })}
            >
              <option value="">Seleccione una opcion</option>
              {sistemasoperativos.map((sistemaoperativo) => (
                <option key={sistemaoperativo.id} value={sistemaoperativo.id}>
                  {sistemaoperativo.sistemaOperativo}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.sistemasOperativos?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTarjetaGrafica">
            <Form.Label>Tarjeta Grafica</Form.Label>
            <Form.Select
              {...register("tarjetasGraficas", {
                validate: (value) =>
                  value !== "" || "Debe seleccionar una Tarjeta Grafica",
                required: "Debe seleccionar una Tarjeta Grafica",
              })}
            >
              <option value="">Seleccione una opcion</option>
              {tarjetasgraficas.map((tarjetagrafica) => (
                <option key={tarjetagrafica.id} value={tarjetagrafica.id}>
                  {tarjetagrafica.tarjetaGrafica}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.tarjetasGraficas?.message}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="button" onClick={cargarinputs}>
            Recargar Inputs
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="mx-3"
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </Button>
        </Form>

        <hr />
      </section>
    </div>
  );
}

export default EditarJuego;
