import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Login from "../view/Login";
import { Link, useNavigate } from "react-router-dom";
import { listarUsuarios } from "../helpers/queries";
import "./Nav.css";

function ItemNavbar({ setUsuarioActivo, usuarioActivo }) {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [Actualizar, setActualizar] = useState([]);

  const navagacion = useNavigate();

  useEffect(() => {
    listarUsuarios().then((usuario) => {
      setUsuarios(usuario);
    });
  }, []);

  useEffect(() => {
    usuarios.map((usuariobuscado) => {
      if (usuariobuscado.id === usuarioActivo) {
        setAdmin(usuariobuscado.rol);
      }
    });
  }, [usuarios]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cerrarSesion = () => {
    setUsuarioActivo(0);
    sessionStorage.removeItem("usuarioLogeado");
    window.location.reload();
    navagacion("/");
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleCloseModal]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark sticky-top body-nav p-0"
      >
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>
              <img
                className="img-local"
                src="https://res.cloudinary.com/dol1ba0ld/image/upload/v1692860070/asd/image-removebg-preview_58_gqj88c.png"
                alt="logo-inicio"
                onError={(e) => {
                  e.target.src = "https://i.stack.imgur.com/lnYep.png";
                }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav buttons-nav" />
          <Navbar.Collapse id="responsive-navbar-nav collapsex buttons-nav">
            <Nav className="me-auto buttons-nav">
              {usuarioActivo.id === 0 ? (
                <>
                  <Link to={"/acerca-de-nosotros"}>
                    <Button
                      variant="secondary"
                      className="mx-1 buttonx"
                      type="submit"
                    >
                      Acerca de Nosotros
                    </Button>
                  </Link>
                  <Button
                    className="mx-1 buttonx"
                    variant="success"
                    type="submit"
                    onClick={handleShowModal}
                  >
                    Iniciar sesión
                  </Button>
                  <Link to={"/registro"}>
                    <Button
                      variant="success"
                      className="mx-1 buttonx"
                      type="submit"
                    >
                      Registro
                    </Button>
                  </Link>

                  <Login
                    className="h-25"
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                  />
                </>
              ) : usuarioActivo.rol === true ? (
                <>
                  <Nav>
                    <Link to={"/administrador"}>
                      <Button
                        className="mx-1 buttonx"
                        variant="secondary"
                        type="submit"
                      >
                        Administrador
                      </Button>
                    </Link>
                  </Nav>
                  <Link to={"/micuenta"}>
                    <Button className="buttonx mx-1" variant="secondary">
                      Mi Cuenta
                    </Button>
                  </Link>

                  <Nav>
                    <Link to={"/acerca-de-nosotros"}>
                      <Button
                        className="mx-1 buttonx"
                        variant="secondary"
                        type="submit"
                      >
                        Acerca de Nosotros
                      </Button>
                    </Link>
                    <Link to={"/administrador"} className="mr-5">
                      <Button
                        className="mx-1 mr-5 buttonx"
                        variant="danger"
                        onClick={() => {
                          cerrarSesion();
                        }}
                      >
                        Cerrar sesión
                      </Button>
                    </Link>
                  </Nav>
                </>
              ) : (
                <>
                  <Link to={"/acerca-de-nosotros"}>
                    <Button
                      variant="secondary"
                      className="mx-1 buttonx"
                      type="submit"
                    >
                      Acerca de Nosotros
                    </Button>
                  </Link>
                  <Link to={"/micuenta"}>
                    <Button
                      variant="secondary"
                      className="mx-1 buttonx"
                      type="submit"
                    >
                      Mi Cuenta
                    </Button>
                  </Link>
                  <Link to={"/"} className="mr-5">
                    <Button
                      className=" mx-1 mr-5 buttonx"
                      variant="danger"
                      onClick={() => {
                        cerrarSesion();
                      }}
                    >
                      Cerrar sesión
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ItemNavbar;
