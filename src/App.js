import "./App.css";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
//Problem is that it is overriding the script already there
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Land from "./pages/land";
import Home from "./pages/Home";
import Calender from "./pages/Calender";
function App() {
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

          <Route
            path="/home"
            render={() => (
              <div>
                <Sidebar />
                <Home />
              </div>
            )}
          />
          <Route
            path="/calender"
            render={() => (
              <div>
                <Sidebar />
                <Calender />
              </div>
            )}
          />
          {/* <Route path='/sign-in' component={SignIn} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
