import Box from "@mui/material/Box";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./calender.css";
/*
 *  <p>
 *          Current selected date is{" "}
 *          <b>{moment(dateState).format("MMMM Do YYYY")}</b>
 *      </p>
 *
 */
function CalendarComp() {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  const [quote, setQuote] = useState(" ");
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://quotes.rest/qod?language=en");
      const json = await result.json();
      console.log(json.contents.quotes[0]);
      setQuote(json.contents.quotes[0]);
    };
    fetchData();
  }, []);
  return (
    <Box class="mainbox">
      <h1>Calender</h1>
      <div class="standingdiv">
        <div class="sleepingdiv">
          <Calendar value={dateState} onChange={changeDate} />
          <p class="tolist">
            <h2>To-Do {moment(dateState).format("MMMM Do YYYY")}</h2>
            <ul class="list">
              <li class="bottom">Add Work :(</li>
            </ul>
          </p>
        </div>
        <div class="dailyquote">
          <h2>Quote of the day</h2>
          <p class="linebreak">{quote.quote}</p>
          <p>- {quote.author}</p>
        </div>
      </div>
    </Box>
  );
}
export default CalendarComp;
