import React from "react";
import CardProgramador from "./programador/CardProgramador";
function AcercaDeNostros() {
  return (
    <>
      <section className="text-center py-5 mx-5 px-5">
        <h1 style={{ fontWeight: "bold", color: "dark" }}>
          Acerca De Nosotros
        </h1>
        <div className="fs-4">
          <p>
            Somos un equipo apasionado comprometido a brindar soluciones
            creativas y efectivas para nuestros clientes.
          </p>
          <p>
            Somos más que una simple tienda en línea; somos un destino creado
            por y para apasionados gamers de todas partes.
          </p>
          <p>
            Nuestra misión es proporcionarte una experiencia de compra única y
            emocionante, donde puedas encontrar todo lo que necesitas para
            llevar tus aventuras virtuales al siguiente nivel.
          </p>
          <p>
            Cada producto que presentamos en nuestra plataforma ha sido
            cuidadosamente seleccionado para garantizar calidad, innovación y
            autenticidad. Desde equipos de alta gama hasta accesorios
            ingeniosos, nuestro catálogo está diseñado para satisfacer las
            necesidades de jugadores casuales y competitivos por igual.
          </p>

          <p>
            ¡Gracias por visitar nuestra página y ser parte de nuestro viaje!
          </p>
        </div>
      </section>
      <CardProgramador></CardProgramador>
    </>
  );
}

export default AcercaDeNostros;
