const uriUsuario = import.meta.env.VITE_API_USUARIO;
const uriJuegos = import.meta.env.VITE_API_JUEGOS;
const uriCategorias = import.meta.env.VITE_API_CATEGORIAS;
const uriJuegosStorage = import.meta.env.VITE_API_JUEGOSSTORAGE;
const uriSistemasOperativos = import.meta.env.VITE_API_SISTEMASOPERATIVOS;
const uriTarjetasGraficas = import.meta.env.VITE_API_TAJETAGRAFICAS;
const uriProcesadores = import.meta.env.VITE_API_PROCESADORES;
const uriResenias = import.meta.env.VITE_API_RESENIAS;
const uriPuntuacion = import.meta.env.VITE_API_PUNTUACION;
const uriProgramador =import.meta.env.VITE_API_PROGRAMADOR;



const fetchData = async (url) => {
    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  export const login = async (usuario) => {
    try {
      const respuesta = await fetch(uriUsuario);
      const listaUsuarios = await respuesta.json();
  
      const usuarioBuscado = listaUsuarios.find(
        (itemUsuario) => itemUsuario.email === usuario.email
      );
      if (usuarioBuscado) {
        if (usuarioBuscado.password === usuario.password) {
          return usuarioBuscado;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const listarUsuarios = async () => {
    return fetchData(uriUsuario);
  };

  
  export const listarPuntuacion = async () => {
    return fetchData(uriPuntuacion);
  };


  export const listarJuegosStorage = async () => {
    return fetchData(uriJuegosStorage);
  };

  export const listarJuegos = async () => {
    return fetchData(uriJuegos);
  };
  
  export const listarCategorias = async () => {
    return fetchData(uriCategorias);
  };
  
  export const listarProcesadores = async () => {
    return fetchData(uriProcesadores);
  };
  
  export const listarSistemasOperativos = async () => {
    return fetchData(uriSistemasOperativos);
  };
  
  export const listarTarjetasGraficas = async () => {
    return fetchData(uriTarjetasGraficas);
  };
  export const listaresenias = async () => {
    return fetchData(uriResenias);
  };

  export const listarProgramador = async () => {
    return fetchData(uriProgramador);
  };

  


  export const crearJuego = async (juego) => {
    try {
      const resp = await fetch(uriJuegos, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juego),
      });

     
  
      return resp;
    } catch (error) {
      console.log(error);
    }
  };
  export const crearPuntuacion = async (Puntuacion) => {
    try {
      const resp = await fetch(uriPuntuacion, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Puntuacion),
      });
  return resp;
} catch (error) {
  console.log(error);
}
};
  export const crearResenias = async (juego) => {
    try {
      const resp = await fetch(uriResenias, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juego),
      });
  
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const crearUsuario = async (Usuario) => {
    try {
      const resp = await fetch(uriUsuario, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Usuario),
      });
  
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerJuego = async (id) => {
    try {
      console.log(id)
      const resp = await fetch(`${uriJuegos}/${id}`);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const editarJuego = async (id, juegoEditado) => {
    try {
      const resp = await fetch(`${uriJuegos}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegoEditado),
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const editarPuntuacion = async (id, puntuacionEditada) => {
    try {
      console.log(id, puntuacionEditada)
      const resp = await fetch(`${uriPuntuacion}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puntuacionEditada),
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const eliminarJuego = async (id) => {
    try {
      const resp = await fetch(`${uriJuegos}/${id}`, {
        method: 'DELETE',
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  export const eliminarjuegosStorage = async (id) => {
    try {
      const resp = await fetch(`${uriJuegosStorage}/${id}`, {
        method: 'DELETE',
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };


  export const eliminarResenias = async (id) => {
    try {
      const resp = await fetch(`${uriResenias}/${id}`, {
        method: 'DELETE',
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  };


  export const CrearjuegosStorage = async (id, usarioId) => {
    try {
      const juegosStorage = {
        idJuego: parseInt(id),
        idUsuario: usarioId
      }
      const resp = await fetch(uriJuegosStorage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegosStorage),
      });
  
      return resp;
    } catch (error) {
      console.log(error);
    }
  };
