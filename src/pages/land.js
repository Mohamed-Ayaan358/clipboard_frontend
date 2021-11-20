import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pin from "../images/Logo.png";
import "./pages.css";

function logIn() {
  console.log("logged in");
  sessionStorage.setItem("user", "admin");
}

function Land() {
  return (
    <div>
      <div class="img-with-text">
        <img id="logo1" src={Pin} alt="main logo" />
        <h4 id="caption1">Clipboard</h4>
      </div>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        <Typography paragraph id="tagline1">
          Compile everything.
        </Typography>
        <Typography paragraph id="tagline2">
          Even if its a simple note
        </Typography>
        <Typography paragraph id="tagline3">
          What is PinBoard you ask? It’s a hyper effective planner for your
          daily needs.
          <br />
          What are you waiting for, get registered now!
        </Typography>
        <div style={{ paddingTop: "100px", textAlign: "center" }}>
          <Link to="/home">
            <button onClick={logIn} id="getstarted">
              Let's get started
            </button>
          </Link>
        </div>
      </Box>

      {/* Need to modify the contents of the actual navbar*/}
      <div id="bottom-bar" class="navbar">
        <p id="about-us"> About us &emsp;</p>
      </div>
    </div>
  );
}

export default Land;

/*
 *Line 32 handles logIn as of now , but this should be be done in login component
 *But one this that remain same is saving the user token in session storage,
 *    I really dont want to handle with the problems of local storage
 *    as of now , assuming that the user is admin and password is always right
 */
