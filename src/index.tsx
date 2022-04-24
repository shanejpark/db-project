import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navigation from "./components/Navigation";
import Patient from "./components/Patient";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

var cors = require("cors");

const app = express();

app.use(cors());
// create express app

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
// import patient routes
import patientRoutes from "./routes/patient.route";

// create patient routes
app.use("/api/v1/patient", patientRoutes);

// import drug routes
import drugRoutes from "./routes/drug.route";

// create drug routes
app.use("/api/v1/drug", drugRoutes);

// listen to the port
app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
});

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
