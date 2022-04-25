const bodyParser = require("body-parser");
const cors = require("cors");
const patientRoutes = require("./src/routes/patient.route");

const app = express();

console.log("Hello:");

app.use(cors());
// create express app

// setup the server port
const port = 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// create patient routes
app.use("/api/v1/patient", patientRoutes);

// listen to the port
app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
});
