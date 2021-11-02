import "./App.css";
import Sidebar from "./Sidebar.js";
import { BrowserRouter as Router } from "react-router-dom";

//plan for App.js , it permanently renders the sidebar , and we have a switch depending on path for rest
//of the content
//but we also have loginf and entry pages , hence the sidebar must also have a switch
function App() {
  return (
    <Router>
      <Sidebar />;
    </Router>
  );
}

export default App;
