import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Container,
  Col,
  Table,
} from "react-bootstrap";
import styles from "./components.module.css";
import axios from "axios";

function Patient() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  function clearState() {
    setName("");
    setAge("");
    setEthnicity("");
    setCountry("");
    setState("");
    setCity("");
    setSex("");
    setWeight("");
    setHeight("");
  }

  async function loadPatients() {
    return axios
      .get("http://localhost:5000/api/v1/patient")
      .then((response) => {
        setPatients(response.data);
      });
  }

  useEffect(() => {
    loadPatients();
  }, []);

  function deletePatient() {
    axios
      .delete(`http://localhost:5000/api/v1/patient/delete/${patient}`)
      .then((result) => {
        loadPatients();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  }

  async function submitNewPatient(e: any) {
    e.preventDefault();
    e.target.reset();
    await axios.post("http://localhost:5000/api/v1/patient", {
      name: name,
      age: age,
      ethnicity: ethnicity,
      country: country,
      state: state,
      city: city,
      sex:
        sex.toLowerCase() === "male"
          ? "0"
          : sex.toLowerCase() === "female"
          ? "1"
          : "",
      weight: weight,
      height: height,
    });
    alert("Data inserted");
    clearState();
    return loadPatients();
  }

  function listAllPatients() {
    return (
      <div>
        <h1>List of Patients</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Ethnicity</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Sex</th>
              <th>Weight (lbs)</th>
              <th>Height (in)</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr>
                <td>{patient["name"]}</td>
                <td>{patient["age"]}</td>
                <td>{patient["ethnicity"]}</td>
                <td>{patient["country"]}</td>
                <td>{patient["state"]}</td>
                <td>{patient["city"]}</td>
                <td>{patient["sex"] === "0" ? "male" : "female"}</td>
                <td>{patient["weight"]}</td>
                <td>{patient["height"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <Container className={styles.containerBlock}>
        <Row className="m-5">{listAllPatients()}</Row>
        <Row className="m-5">
          <h2>Add new patient</h2>
          <Form onSubmit={submitNewPatient} className="mt-3">
            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Ethnicity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ethnicity"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Sex</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Weight (lbs)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Weight (lbs)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Height (in)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Height (in)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="button" size="sm" onClick={clearState}>
              Clear
            </Button>

            <Button
              variant="dark"
              type="submit"
              size="sm"
              className={styles.button}
            >
              Submit
            </Button>
          </Form>
        </Row>
        <Row className="m-5">
          <h2>Delete Patient</h2>
          <Form onSubmit={deletePatient} className="mt-3">
            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="dark"
              type="submit"
              size="sm"
              className={styles.button}
            >
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default Patient;
