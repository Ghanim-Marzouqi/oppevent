import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

// CSS Files
import "@material/react-material-icon/dist/material-icon.css";

// const ENV =
//   process.env.NODE_ENV === "development" ? (
//     <Router>
//       <App />
//     </Router>
//   ) : (
//     <Router basename={window.location.pathname || ""}>
//       <App />
//     </Router>
//   );

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
