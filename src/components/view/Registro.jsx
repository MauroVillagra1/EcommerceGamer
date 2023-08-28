import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Registro.css";
import { crearUsuario, listarUsuarios } from "../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Registro = () => {
  const [usuarios, setUsuarios] = useState("");
  const gmailLogo =
    "https://cdn.icon-icons.com/icons2/2631/PNG/512/gmail_new_logo_icon_159149.png";
  const facebookLogo =
    "https://cdn.icon-icons.com/icons2/555/PNG/512/facebook_icon-icons.com_53612.png";
  const instagramLogo =
    "https://cdn.icon-icons.com/icons2/1753/PNG/512/iconfinder-social-media-applications-3instagram-4102579_113804.png";
  const twitterLogo =
    "https://cdn.icon-icons.com/icons2/122/PNG/512/twitter_socialnetwork_20007.png";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    listarUsuarios().then((resultado) => {
      const ListaUsuarios = resultado;
      console.log(ListaUsuarios);
      setUsuarios(ListaUsuarios);
    });
  }, []);

  const onSubmit = (datos) => {
    datos["rol"] = false;
    console.log(datos);
    crearUsuario(datos)
      .then((resp) => {
        console.log(resp.status);
        if (resp.status === 201) {
          Swal.fire(
            "Usuario Registrado",
            "Su Usuario se creo correctamente",
            "success"
          );
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Hubo un error",
          "Error al intentar Crear el Usuario",
          "error"
        );
      });
    reset();
  };

  return (
    <div className="d-flex conteiner-register minHeader">
      <div>
        <div className="carrousel-container">
          <div className="image-container">
            <img
              className="h-100"
              src="https://sm.ign.com/ign_es/screenshot/default/valorant-jett-red-1_64a2.jpg"
              alt="img-registro"
              onError={(e) => {
                e.target.src = "https://i.stack.imgur.com/lnYep.png";
              }}
            />
          </div>
          <div className="overlay2">
            <div className="registration-form-container mt-4">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formnombreUsuario">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("nombreUsuario", {
                      required: "Este dato es obligatorio",
                      pattern: {
                        value: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]*$/,
                        message: "Debe ingresar solo letras validas",
                      },
                      minLength: {
                        value: 6,
                        message: "Debe ingresar como minimo 6 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe ingresar como maximo 50 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.nombreUsuario?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formemail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("email", {
                      required: "Este dato es obligatorio",
                      pattern: {
                        value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                        message: "Debe ingresar solo caracteres validos",
                      },
                      validate: (value) => {
                        var bandera = false;
                        {
                          {
                            usuarios.map((usuario) => {
                              if (value === usuario.email) {
                                bandera = true;
                                console.log("Usuario Invalido");
                              }
                            });
                          }
                          if (bandera === false) {
                            console.log("Usuario Valido");
                          } else {
                            bandera = true;
                            console.log("Usuario ya existe");
                            return "El email ya existe";
                          }
                        }
                      },
                      minLength: {
                        value: 6,
                        message: "Debe ingresar como minimo 6 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe ingresar como maximo 50 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formnpassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("password", {
                      required: "Este dato es obligatorio",
                      pattern: {
                        value: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ]*$/,
                        message: "Debe ingresar solo letras y numeros validas",
                      },
                      minLength: {
                        value: 6,
                        message: "Debe ingresar como minimo 6 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe ingresar como maximo 50 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <Button variant="warning" type="submit">
                  Registrarse
                </Button>
              </Form>
              <div className="social-login-buttons">
                <p>O inicia sesión con:</p>
                <div className="d-flex justify-content-center flex-wrap">
                  <Button
                    className="social-button gmail box-img d-flex justify-content-center"
                    variant="outline-light"
                  >
                    <img
                      src={gmailLogo}
                      alt="Gmail"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                    Gmail
                  </Button>
                  <Button
                    className="social-button facebook box-img d-flex justify-content-center"
                    variant="outline-light"
                  >
                    <img
                      src={facebookLogo}
                      alt="Facebook"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                    Facebook
                  </Button>
                  <Button
                    className="social-button instagram box-img d-flex justify-content-center"
                    variant="outline-light"
                  >
                    <img
                      src={instagramLogo}
                      alt="Instagram"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                    Instagram
                  </Button>
                  <Button
                    className="social-button twitter box-img d-flex justify-content-center"
                    variant="outline-light"
                  >
                    <img
                      src={twitterLogo}
                      alt="Twitter"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
