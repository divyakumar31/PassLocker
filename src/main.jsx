import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pass from "./routes/Pass.jsx";
import Generator from "./routes/Generator.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<Pass />} />
        <Route path="/passgenerator" exact element={<Generator />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
