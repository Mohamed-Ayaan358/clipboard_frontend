import React from "react";
import './notFound.css'

function notFound() {
  return (
    <>
      {window.history.pushState('404', 'Clipboard | 404', '/notfound')}
      <div style={{
        top: "50%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        fontFamily: "Courier New, Courier, monospace",
        fontSize: "25px",
        textAlign: "center"
      }}>
        <h1 title="ERROR 404">ERROR 404</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>Requested file does not exist! :(</p>
        <br></br>
        <b><a href="/" title="Home Page">GO BACK TO THE HOME PAGE</a></b>
      </div>
    </>
  );
}

export default notFound;
