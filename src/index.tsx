import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navigation from "./components/Navigation";
import Patient from "./components/Patient";
import Drug from "./components/Drug";
import Info from "./components/Info";
import SideEffect from "./components/SideEffect";
import Manufacturer from "./components/Manufacturer";
import Home from "./components/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/drugs" element={<Drug />} />
      <Route path="/side_effects" element={<SideEffect />} />
      <Route path="/manufacturer" element={<Manufacturer />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  </Router>
);
