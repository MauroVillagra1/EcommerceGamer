import React, { useState, useEffect } from "react";
import "./Error404.css";
import { Link } from "react-router-dom";

const Error404 = () => {
  const textToShow = "¡Game Over temporal!";
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < textToShow.length) {
        setVisibleText(textToShow.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="image-container">
        <img
          src="https://tecnoblog.net/wp-content/uploads/2016/06/mario_sad.jpg"
          className="image"
        />
        <div className="text-overlay">
          <p className="retro-text">{visibleText}</p>
          <div>
            <button className="magic-button">
              <Link className="btn btn-primary" to={"/"}>
                Volver al inicio
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Error404;
