import React from "react";
import ReactDOM from "react-dom";
import data from "./data.json";
import Board from "react-trello";
import Box from "@mui/material/Box";
import "./trello.css";

function Trello() {
  return (
    <div>
      <Box class="trellobox">
        <Board
          class="trello"
          data={data}
          cardStyle={{
            backgroundColor: "white",
            width: "280px",
            borderRadius: "15px",
            border: "2px solid red",
          }}
          laneStyle={{
            backgroundColor: "#0D0C1D",
            color: "red",
            borderRadius: "10px",
          }}
          style={{ backgroundColor: "white", color: "red" }}
          editLaneTitle
          editable
          draggable
        />
      </Box>
    </div>
  );
}
export default Trello;
