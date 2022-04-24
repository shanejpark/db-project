import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navigation from "./components/Navigation";
import Patient from "./components/Patient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/patient" element={<Patient />} />
      <Route path="/drugs" element={<Patient />} />
    </Routes>
  </Router>
);
