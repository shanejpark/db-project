import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container, Table } from "react-bootstrap";
import styles from "./components.module.css";
import axios from "axios";

function Drug() {
  const [drugs, setDrugs] = useState([]);

  const [commonName, setCommonName] = useState("");
  const [medicalName, setMedicalName] = useState("");
  const [formula, setFormula] = useState("");
  const [generic, setGeneric] = useState("");

  function clearState() {
    setCommonName("");
    setMedicalName("");
    setFormula("");
    setGeneric("");
  }

  async function loadDrugs() {
    return axios.get("http://localhost:5000/api/v1/drugs").then((response) => {
      setDrugs(response.data);
    });
  }

  async function submitNewDrug(e: any) {
    e.preventDefault();
    e.target.reset();
    await axios.post("http://localhost:5000/api/v1/drugs", {
      common_name: commonName,
      medical_name: medicalName,
      formula: formula,
      generic: generic,
    });
    alert("Data inserted");
    clearState();
    return loadDrugs();
  }

  function listAllDrugs() {
    return (
      <div>
        <h1>List of Drugs</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Medical Name</th>
              <th>Formula</th>
              <th>Generic</th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((drug) => (
              <tr>
                <td>{drug["common_name"]}</td>
                <td>{drug["medical_name"]}</td>
                <td>{drug["formula"]}</td>
                <td>{drug["generic"] === 1 ? "yes" : "no"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  useEffect(() => {
    loadDrugs();
  }, []);

  return (
    <div className={styles.filter}>
      <Container className={styles.containerBlock}>
        <Row className="m-5">{listAllDrugs()}</Row>
        <Row className="m-5">
          <h2>Add new drug</h2>
          <Form onSubmit={submitNewDrug} className="mt-3">
            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Common Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Common Name"
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Medical Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medical Name"
                value={medicalName}
                onChange={(e) => setMedicalName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Formula</Form.Label>
              <Form.Control
                type="text"
                placeholder="Formula"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Generic</Form.Label>
              <Form.Control
                type="text"
                placeholder="Generic"
                value={generic}
                onChange={(e) => setGeneric(e.target.value)}
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
      </Container>
    </div>
  );
}

export default Drug;
