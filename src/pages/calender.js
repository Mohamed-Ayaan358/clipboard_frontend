import Box from "@mui/material/Box";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./calender.css";
import { useQuery, gql } from "@apollo/client";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
/*
 *  <p>
 *          Current selected date is{" "}
 *          <b>{moment(dateState).format("MMMM Do YYYY")}</b>
 *      </p>
 *
 */

let globdata = [];

function renderRow(props) {
  const { index, style } = props;
  console.log(globdata[index]);
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText>{globdata[index].title}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
/*
 *const testQuery = gql`
 *  query GetTodos {
 *    hello
 *  }
 *`;
 */
const TodoQuery = gql`
  query GetTodos($username: String!, $searchdate: String!) {
    getTodos(username: $username, searchdate: $searchdate) {
      id
      title
      status
      description
      createdAt
      date
    }
  }
`;

function CalendarComp() {
  const [quote, setQuote] = useState(" ");
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://quotes.rest/qod?language=en");
      const json = await result.json();
      console.log(json.contents.quotes[0]);
      setQuote(json.contents.quotes[0]);
    };
    fetchData(); //Calls Function
  }, []);
  const [dateState, setDateState] = useState(new Date());
  const [user] = useState(sessionStorage.getItem("user"));
  const changeDate = (e) => {
    setDateState(e);
  };

  const { loading, data, error } = useQuery(TodoQuery, {
    variables: {
      username: user.toString(),
      searchdate: moment(dateState).format("DDMMYYYY").toString(),
    },
  });
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Oops!Err!!!!</h1>;
  }

  //the below if cond is becus I was gettig 2 queries during startup
  //and one always giving undef , and gettin object props on them crashed the
  //app
  let len = 0;
  if (data !== undefined) {
    console.log(data);
    len = data.getTodos.length;
    globdata = data.getTodos;
  }

  return (
    <Box class="mainbox">
      <div class="headerpad">
        <h1 class="head">Calender</h1>
        <h3 class="userinfo">{user}</h3>
      </div>
      <div class="standingdiv">
        <div class="sleepingdiv">
          <Calendar value={dateState} onChange={changeDate} />
          <div class="compose">
            <div class="listdiv">
              <h2>To-Do {moment(dateState).format("MMMM Do YYYY")}</h2>
              <div class="list">
                <FixedSizeList
                  height={400}
                  itemSize={46}
                  itemCount={len}
                  overscanCount={5}
                >
                  {renderRow}
                </FixedSizeList>
              </div>
            </div>
            <div class="dailyquote">
              <h4>Quote of the day</h4>
              <p class="linebreak">{quote.quote}</p>
              <p>- {quote.author}</p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
export default CalendarComp;

/*
 * Very important part of all components
 *<div class="headerpad">
 *        <h1 class="head">Calender</h1>
 *        <h3 class="userinfo">{user}</h3>
 *      </div>
 */
