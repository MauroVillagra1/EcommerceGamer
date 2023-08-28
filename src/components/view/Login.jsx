import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { login } from "../helpers/queries";
import "./Login.css";

const Login = ({ showModal, handleCloseModal, setUsuarioActivo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (usuario) => {
    login(usuario).then((respuesta) => {
      if (respuesta) {
        handleCloseModal();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        var datosUsuario = {
          id: respuesta.id,
          rol: respuesta.rol,
          nombreUsuario: respuesta.nombreUsuario,
          email: respuesta.email,
        };
        sessionStorage.setItem("usuarioLogeado", JSON.stringify(datosUsuario));
        setUsuarioActivo(datosUsuario);
      } else {
        Swal.fire("Ocurrio un error", "Email o password incorrecto", "error");
      }
    });
  };

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header
          className="modal-header text-center py-4"
          style={{
            backgroundColor: "#2727",
            color: "#000000",
          }}
        ></Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value: /^[\w\.-]+@[\w\.-]+\.\w+$/,

                    message:
                      "El email debe cumplir con un formato valido como el siguiente mail@mail.com",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3 text-white"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "El password es un dato obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ]*$/,

                    message:
                      "El password debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Col xs="12">
              <div className="d-grid gap-2">
                <Button
                  style={{
                    backgroundColor: "#28a745",
                    border: 0,
                  }}
                  type="submit"
                  size="lg"
                >
                  Ingresar
                </Button>
              </div>
            </Col>
          </Form>
          <Row className="justify-content-center mb-5 content-text-login">
            <Col xs="6" className="mt-2 text-center text-login">
              <Link
                to={"/registro"}
                onClick={handleCloseModal}
                className=" my-4 text-white link-hover"
                style={{ textDecoration: "none" }}
              >
                ¿No tienes una cuenta?
              </Link>
            </Col>
            <Col xs="6" className="mt-2 text-center text-login">
              <Link
                className=" my-4 text-white link-hover "
                style={{ textDecoration: "none" }}
                to={"/*"}
                onClick={handleCloseModal}
              >
                ¿Has olvidado la contraseña?
              </Link>
            </Col>
          </Row>
          <section className="col-12">
            <article className="d-flex justify-content-center">
              <ul className="list-inline d-flex flex-wrap justify-content-center ">
                <li className="nav-item social-logo mx-2">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/socials/icon-dcr.svg"
                      alt="discord-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item social-logo mx-2">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/socials/icon-tw.svg"
                      alt="twitter-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item social-logo mx-2">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/socials/icon-igr.svg"
                      alt="instagram-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item social-logo mx-2">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/socials/icon-fb.svg"
                      alt="facebook-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item social-logo mx-2">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/socials/icon-yt.svg"
                      alt="youtube-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item mx-2 social-logo">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/socials/icon-tch.svg"
                      alt="twitch-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
                <li className="nav-item social-logo mx-2">
                  <Link
                    className="nav-link mx-2"
                    to={"/*"}
                    onClick={handleCloseModal}
                  >
                    <img
                      src="https://www.instant-gaming.com/themes/igv2/images/icons/icon-extension.svg"
                      alt="googlestore-logo"
                      onError={(e) => {
                        e.target.src = "https://i.stack.imgur.com/lnYep.png";
                      }}
                    />
                  </Link>
                </li>
              </ul>
            </article>
          </section>
        </Modal.Body>
        <Modal.Footer
          className="modal-footer"
          style={{
            backgroundColor: "#272728",
          }}
        >
          <Button
            onClick={handleCloseModal}
            style={{
              backgroundColor: "#28a745",
              border: 0,
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
