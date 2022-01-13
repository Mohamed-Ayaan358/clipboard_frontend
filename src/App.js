import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading, Navbar } from "./components";
import { ProtectedRoute } from "./auth"

import CalendarComp from "./pages/calendar";
import Folders from "./pages/folders";
import Land from "./pages/land";
import notFound from "./pages/notFound";
import Trello from "./pages/trello";


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (<Loading />)
  }

  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Land />
              </div>
            )}
          />

          <ProtectedRoute
            path="/trello"
            component={() => (
              <div class="barcontent">
                <Navbar />
                <Trello />
              </div>
            )}
          />

          <ProtectedRoute
            path="/calendar"
            component={() => (
              <div class="barcontent">
                <Navbar />
                <CalendarComp />
              </div>
            )}
          />

          <ProtectedRoute
            path="/folders"
            component={() => (
              <div class="barcontent">
                <Navbar />
                <Folders />
              </div>
            )}
          />

          <Route path="" component={notFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
