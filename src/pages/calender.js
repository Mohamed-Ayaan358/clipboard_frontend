import Box from "@mui/material/Box";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./calender.css";
import { useQuery, gql, useMutation } from "@apollo/client";
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

const AddTodo = gql`
  mutation AddTodo(
    $username: String!
    $title: String!
    $description: String!
    $status: Boolean!
    $date: String!
  ) {
    AddTodo(
      username: $username
      title: $title
      description: $description
      status: $status
      date: $date
    ) {
      title
      description
      status
      createdAt
      date
      id
    }
  }
`;

function CalendarComp() {
  let [globdata, updateGlob] = useState([]);
  let [len, setLen] = useState(0);
  const [quote, setQuote] = useState(" ");
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://quotes.rest/qod?language=en");
      const json = await result.json();
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
    onCompleted: async (data) => {
      await updateGlob(data.getTodos);
      await setLen(data.getTodos.length);
      if (data.getTodos.length === 0) setLen(0);
      else setLen(data.getTodos.length);
    },
  });
  async function updatelist(data) {
    updateGlob(data);
    setLen(globdata.length + 1);
  }
  let dummy = data; //else if gives warning ans netlify fails
  console.log(dummy);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addTodo, { dat }] = useMutation(AddTodo, {
    onCompleted: async (dat) => {
      let newglob = [...globdata];
      await newglob.push(dat.AddTodo);
      await updatelist(newglob);
    },
  });

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  //Below is to handle mutations , i.e adding new work on user disablePadding
  //ref :
  /*
   *$userId: ID!
   * $title: String!
   * $description: String!
   * $status: Boolean!
   * $date: String!
   */

  let renderRow = function renderRow(props) {
    const { index, style } = props;
    if (globdata[index] === undefined) return null;
    if (loading) {
      return <p>Loading...Hang in there, we are fetching your data!</p>;
    }
    if (error) return <p>Oops!Something went wrong :(</p>;
    if (len === 0)
      return <p>Bzzz...Doesn't seem like you have anything planned :0</p>;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText>{globdata[index].title}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

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
                  list={globdata}
                >
                  {renderRow}
                </FixedSizeList>
                <div class="addwork">
                  <div class="col-3">
                    <input
                      class="effect-8"
                      type="text"
                      placeholder="Work Title"
                      onChange={handleTitle}
                    />
                    <span class="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <div class="col-3">
                    <input
                      class="effect-8"
                      type="text"
                      placeholder="Work Description"
                      onChange={handleDescription}
                    />
                    <span class="focus-border">
                      <i></i>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (title === "" || description === "") {
                        alert("Please fill all the fields");
                      } else {
                        addTodo({
                          variables: {
                            username: user.toString(),
                            title: title,
                            description: description,
                            status: false,
                            date: moment(dateState)
                              .format("DDMMYYYY")
                              .toString(),
                          },
                        });
                        setTitle("");
                        setDescription("");
                      }
                      console.log(dat);
                    }}
                    class="subbut"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dailyquote">
          <h4>Quote of the day</h4>
          <p class="linebreak">{quote.quote}</p>
          <p>- {quote.author}</p>
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
