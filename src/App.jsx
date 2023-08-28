import "./App.css";
import Footer from "./components/cummon/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./components/view/Inicio";
import Login from "./components/view/Login";
import AcercaDeNostros from "./components/view/AcercaDeNostros";
import DetalleJuego from "./components/view/DetalleJuego";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./components/view/Error404";
import ComprarJuego from "./components/view/ComprarJuego";
import Nav from "./components/cummon/Nav";
import { useState, useEffect } from "react";
import EncapsularRutas from "./components/routes/EncapsularRutas";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import EncapsularRutasMiCuenta from "./components/routes/EncapsularRutasMiCuenta";
import RutasProtegidasMiCuenta from "./components/routes/RutasProtegidasMiCuenta";
import EncapsularRutasRegistro from "./components/routes/EncapsularRutasRegistro";
import RutasProtegidasRegistro from "./components/routes/RutasProtegidasRegistro";
import ScrollToTop from "./ScrollToTop";

function App() {
  const UsuarioNoLogueado = {
    id: 0,
    rol: false,
  };
  const usuarioOnline =
    JSON.parse(sessionStorage.getItem("usuarioLogeado")) || UsuarioNoLogueado;

  const [usuarioActivo, setUsuarioActivo] = useState(usuarioOnline);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Nav
          setUsuarioActivo={setUsuarioActivo}
          usuarioActivo={usuarioActivo}
        ></Nav>

        <Routes>
          <Route
            exact
            path="/"
            element={<Inicio usuarioActivo={usuarioActivo}></Inicio>}
          ></Route>
          <Route
            exact
            path="/login"
            element={<Login setUsuarioActivo={setUsuarioActivo}></Login>}
          ></Route>
          <Route
            exact
            path="/acerca-de-nosotros"
            element={<AcercaDeNostros></AcercaDeNostros>}
          ></Route>
          <Route
            path="/registro/*"
            element={
              <EncapsularRutasRegistro>
                <RutasProtegidasRegistro />
              </EncapsularRutasRegistro>
            }
          ></Route>
          <Route
            exact
            path="/detalle/:id"
            element={
              <DetalleJuego usuarioActivo={usuarioActivo}></DetalleJuego>
            }
          ></Route>
          <Route
            exact
            path="/ComprarJuego/:id"
            element={
              <ComprarJuego usuarioActivo={usuarioActivo}></ComprarJuego>
            }
          ></Route>
          <Route
            path="/administrador/*"
            element={
              <EncapsularRutas>
                <RutasProtegidas />
              </EncapsularRutas>
            }
          ></Route>
          <Route
            path="/micuenta/*"
            element={
              <EncapsularRutasMiCuenta>
                <RutasProtegidasMiCuenta usuarioActivo={usuarioActivo} />
              </EncapsularRutasMiCuenta>
            }
          ></Route>

          <Route exact path="*" element={<Error404></Error404>}></Route>
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
