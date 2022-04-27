import React, { useState } from "react";
import {
  Col,
  Card,
  Form,
  Button,
  Row,
  Container,
  Table,
} from "react-bootstrap";
import styles from "./components.module.css";
import axios from "axios";

function SideEffect() {
  const [patientDrugName, setPatientDrugName] = useState("");
  const [drugPatientName, setDrugPatientName] = useState("");
  const [sideEffects, setSideEffects] = useState([]);

  const [patientName, setPatientName] = useState("");
  const [drugName, setDrugName] = useState("");
  const [sideEffectName, setSideEffectName] = useState("");
  const [severity, setSeverity] = useState("");
  const [result, setResult] = useState("");

  async function searchPatientDrug() {
    return axios
      .get(
        `http://localhost:5000/api/v1/side_effect/${patientDrugName}/${drugPatientName}`
      )
      .then((response) => {
        setSideEffects(response.data);
      });
  }

  function clearState() {
    setPatientName("");
    setDrugName("");
    setSideEffectName("");
    setSeverity("");
    setResult("");
  }

  async function submitNewSideEffect(e: any) {
    e.preventDefault();
    e.target.reset();
    await axios.post("http://localhost:5000/api/v1/side_effect/create", {
      patient_name: patientName,
      drug_name: drugName,
      side_effect_name: sideEffectName,
      severity: severity,
      result: result,
    });
    alert("Data inserted");
    clearState();
  }

  function sideEffectsTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
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

  return (
    <div className={styles.filter}>
      <Container className={styles.containerBlock}>
        <Row className="m-5">
          <Col>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title>Get side effects</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="form">
                    <Form.Label column="sm">Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Patient"
                      value={patientDrugName}
                      onChange={(e) => setPatientDrugName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="form">
                    <Form.Label column="sm">Drug</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Drug"
                      value={drugPatientName}
                      onChange={(e) => setDrugPatientName(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="dark"
                    type="button"
                    size="sm"
                    className={styles.button}
                    onClick={searchPatientDrug}
                  >
                    Search
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>{sideEffects.length > 0 && sideEffectsTable()}</Col>
        </Row>
        <Row className="m-5">
          <h2>Add new side effect</h2>
          <Form onSubmit={submitNewSideEffect} className="mt-3">
            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Drug Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Medical Name"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Side Effect Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Side Effect Name"
                value={sideEffectName}
                onChange={(e) => setSideEffectName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Severity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="form">
              <Form.Label column="sm">Result</Form.Label>
              <Form.Control
                type="text"
                placeholder="Severity"
                value={result}
                onChange={(e) => setResult(e.target.value)}
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

export default SideEffect;
