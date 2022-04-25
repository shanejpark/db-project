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
  const [patientName, setPatientName] = useState("");
  const [drugName, setDrugName] = useState("");
  const [sideEffects, setSideEffects] = useState([]);
  const [patients, setPatients] = useState([]);

  async function loadPatients() {
    return fetch("http://localhost:5000/api/v1/patient/")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setPatients(myJson);
      });
  }
  useEffect(() => {
    loadPatients();
  });

  async function searchPatientDrug() {
    return fetch(
      `http://localhost:5000/api/v1/patient/searchRecord/${patientName}/${drugName}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setPatients(myJson);
      });
    axios
      .get(
        `http://localhost:5000/api/v1/patient/searchRecord/${patientName}/${drugName}`
      )
      .then((response) => {
        setSideEffects(response.data);
      });
  }

  function table() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Side Effects</th>
            </tr>
          </thead>
          <tbody>
            {sideEffects.map((sideEffect) => (
              <tr>
                <td>{sideEffect["name"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function listAllPatients() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Name</th>
              <th>Name</th>
              <th>Name</th>
              <th>Name</th>
              <th>Name</th>
              <th>Name</th>
              <th>Name</th>
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
                <td>{patient["sex"]}</td>
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
      <div className={styles.filter}>
        <Container>
          <Row className="mx-3">
            <Card className={styles.card}>
              <Form>
                <Form.Group className="mb-3" controlId="form">
                  <Form.Label column="lg">Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Patient"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form">
                  <Form.Label column="lg">Drug</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Drug"
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  type="button"
                  size="sm"
                  className={styles.button}
                  onClick={searchPatientDrug}
                >
                  Submit
                </Button>
              </Form>
            </Card>
            {table()}
            {listAllPatients()}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Patient;
