import moment from "moment";
import { useQuery, gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pin from "../images/Logo.png";
import "./pages.css";

function Card(props) {
  return (
    <div class="col-sm-6 col-lg-4">
      <div class="card text-center clean-card">
        <img
          class="card-img-top w-100 d-block"
          src={props.avatar}
          alt={props.name}
        />
        <div class="card-body info">
          <h4 class="card-title">{props.name}</h4>
          <p class="card-text">
            {props.about}
            <br />
            Studying CSE at PES University
          </p>
          <a href={props.github}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/github-1521500-1288242.png"
              alt="GitHub"
              width="30px"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
}

function setSessionStorage(user) {
  console.log("logged in");
  sessionStorage.setItem("nickname", user.nickname);
  sessionStorage.setItem("user", user.name);
  sessionStorage.setItem("id", user.sub);
}

function NotLoggedIn() {
  const { loginWithPopup } = useAuth0();
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-black">
        <div class="navbar-brand" style={{ paddingLeft: "10px" }} href="#">
          <img
            src={Pin}
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          ></img>
          ClipBoard
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul class="navbar-nav mr-md-2">
            <li class="nav-item active">
              <a class="nav-link" href="#features">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#aboutUs">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div style={{ paddingRight: "10px" }}>
          <button
            class="btn"
            style={{
              color: "white",
              backgroundColor: "#E42346",
              borderColor: "#E42346",
            }}
            type="button"
            onClick={() => loginWithPopup()}
          >
            Login
          </button>
        </div>
      </nav>

      <div main class="page landing-page">
        <section class="cover">
          <div
            class="cover-inside "
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content",
            }}
          >
            <div
              class="card shadow"
              style={{ width: "500px", borderRadius: "30px" }}
            >
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography paragraph id="tagline1">
                  Compile everything.
                </Typography>

                <Typography paragraph id="tagline2">
                  Even if its a simple note
                </Typography>

                <Typography
                  paragraph
                  id="tagline3"
                  style={{ color: "#0D0C1D" }}
                >
                  What is PinBoard you ask? It’s a hyper effective planner for
                  your daily needs.
                  <br />
                  What are you waiting for, get registered now!
                </Typography>

                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() =>
                      loginWithPopup({
                        screen_hint: "signup",
                      })
                    }
                    id="getstarted"
                  >
                    Let's get started
                  </button>
                </div>
              </Box>
            </div>
          </div>
        </section>

        <section id="features" style={{ paddingTop: "50px" }}>
          <div class="container">
            <div class="block-heading">
              <h2 style={{ color: "#E42346" }}>Features</h2>
              <p>
                PinBoard aims to be an extremely effective note taking app/event
                planning service.
                <br />
                <br />
                <b>What makes it different from any normal note keeping app?</b>
                <br />
                We plan to add several features like an intuitive calendar and
                an area used to create not just notes but also share files and
                maintain comparison lists.
              </p>
            </div>
          </div>
        </section>

        <section id="aboutUs" class="clean-block about-us">
          <div class="container">
            <div class="block-heading">
              <h2 style={{ color: "#E42346" }}>About Us</h2>
              {/* <p>
                ClipBoard was made by three students. Meet the Team.
              </p> */}
            </div>
            <div class="row justify-content-center">
              <Card
                name="Mohamed Ayaan"
                avatar="https://avatars.githubusercontent.com/u/72858215?v=4"
                about="I love designing websites and I am trying to make apps on my accord"
                github="https://github.com/Mohamed-Ayaan358"
              />
              <Card
                name="Navin Shrinivas"
                avatar="https://avatars.githubusercontent.com/u/42774281?v=4"
                about="19 year old boi....computer enthusiast , caffine sober."
                github="https://github.com/NavinShrinivas"
              />
              <Card
                name="Mitul Joby"
                avatar="https://avatars.githubusercontent.com/u/73733877?v=4"
                about="I like making stuff. Constantly learning something new!"
                github="https://github.com/Mitul-Joby"
              />
            </div>
          </div>
        </section>
      </div>

      <footer class="page-footer">
        <p>
          <br />
          Copyright © ClipBoard 2021
        </p>
      </footer>
    </>
  );
}

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
function LoggedIn() {
  let recentwork = null;
  let [globdata, updateGlob] = useState([]);
  const { user, logout } = useAuth0();
  const { loading, data, error } = useQuery(TodoQuery, {
    variables: {
      username: user.name.toString(),
      searchdate: moment(new Date()).format("DDMMYYYY").toString(),
    },
    fetchPolicy: "no-cache",
    onCompleted: async (data) => {
      await updateGlob(data.getTodos);

      console.log(data);
      if (data[0] === undefined) recentwork = null;
      else recentwork = globdata[0].title;
    },
  });

  const [quote, setQuote] = useState(" ");
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://quotes.rest/qod?language=en");
      const json = await result.json();
      console.log(json);
      if (json.contents === undefined) {
        setQuote("No quote available");
      } else {
        setQuote(json.contents.quotes[0]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {setSessionStorage(user)}

      <nav class="navbar navbar-expand-lg navbar-dark bg-black">
        <div class="navbar-brand" style={{ paddingLeft: "10px" }} href="#">
          <img
            src={Pin}
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt="logo"
          ></img>
          ClipBoard
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul class="navbar-nav mr-md-2">
            <li class="nav-item active">
              <a class="nav-link" href="/calendar">
                Calendar
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/folder">
                Folders
              </a>
            </li>
          </ul>
        </div>

        <div style={{ paddingRight: "10px" }}>
          <button
            class="btn"
            style={{
              color: "white",
              backgroundColor: "#E42346",
              borderColor: "#E42346",
            }}
            type="button"
            onClick={() => {
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("nickname");
              sessionStorage.removeItem("id");
              logout({
                returnTo: window.location.origin,
              });
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div class="row g-0 justify-content-center">
        <div
          class="card text-center clean-card shadow my-3"
          style={{ borderRadius: "30px", width: "35%" }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              class="rounded-circle mb-3 mt-4"
              src={user.picture}
              alt={user.name}
              width="160"
              height="160"
            />
          </div>

          <div class="card-body info">
            <h4 class="card-title">{user.name || user.nickname}</h4>
            <p class="card-text">
              <b>{`Email: ${user.email}`}</b>
              <br></br>
            </p>
          </div>
        </div>
        &nbsp; &nbsp;
        <div
          class="card text-center clean-card shadow my-3"
          style={{ borderRadius: "30px", width: "60%" }}
        >
          <div class="row justify-content-center">
            <a
              href="/calendar"
              class="card card-selectable text-white bg-black text-center clean-card mx-3 my-3"
              style={{
                textDecoration: "none",
                borderRadius: "30px",
                width: "43%",
              }}
            >
              <div class="card-body info">
                <h4 class="card-title" style={{ color: "#E42346" }}>
                  Up Coming Events
                </h4>
                <p class="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </a>

            <a
              href="/folders"
              class="card card-selectable text-white bg-black text-center clean-card mx-3 my-3"
              style={{
                textDecoration: "none",
                borderRadius: "30px",
                width: "43%",
              }}
            >
              <div class="card-body info">
                <h4 class="card-title" style={{ color: "#E42346" }}>
                  TO DO
                </h4>
                <p class="card-text">{recentwork}</p>
              </div>
            </a>
          </div>

          <div
            class="card text-center clean-card shadow mx-3 my-3"
            style={{ borderRadius: "30px" }}
          >
            <div
              class="card-header"
              style={{ backgroundColor: "#000000", color: "#E42346" }}
            >
              <b>Quote of the Day</b>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p class="linebreak">{quote.quote}</p>
                <footer class="blockquote-footer">
                  <cite title="Source Title">{quote.author}</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <h4>Quote of the day</h4>
        <p class="linebreak">{quote.quote}</p>
        <p>- {quote.author}</p>
      </div> */}

      <footer class="page-footer">
        <p>
          <br />
          Copyright © ClipBoard 2021
        </p>
      </footer>
    </>
  );
}

const CreateUser = gql`
  mutation CreateUser($username: String!, $authID: String!) {
    CreateUser(username: $username, authID: $authID) {
      id
      username
      authID
    }
  }
`;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function userceate(username, authID, createUser) {
  await createUser({
    variables: {
      username: username,
      authID: authID,
    },
  });
  await delay(10000);
}

function Land() {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const [createUser, { loading, error }] = useMutation(CreateUser);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (isAuthenticated) {
    userceate(user.name, user.sub, createUser);
  }

  return isAuthenticated ? <LoggedIn /> : <NotLoggedIn />;
}

export default Land;
