import Box from "@mui/material/Box";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./calender.css";

function CalendarComp() {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  return (
    <div>
      <Box
        id="content"
        component="main"
        sx={{ flexGrow: 1, p: 3, paddingLeft: "100px" }}
      >
        <Calendar value={dateState} onChange={changeDate} />
        <p>
          Current selected date is{" "}
          <b>{moment(dateState).format("MMMM Do YYYY")}</b>
        </p>
      </Box>
    </div>
  );
}
export default CalendarComp;
