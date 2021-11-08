import React from "react";
import Box from "@mui/material/Box";
import "./pages.css";

function Calender() {
  return (
    <>
      <h1 id="head">Calender</h1>
      <Box
        id="content"
        component="main"
        sx={{ flexGrow: 1, p: 3, paddingLeft: "100px" }}
      ></Box>
    </>
  );
}

export default Calender;

