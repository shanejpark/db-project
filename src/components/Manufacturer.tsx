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

function Manufacturer() {
  const [manufacturerSideEffect, setManufacturerSideEffect] = useState("");
  const [sideEffectCount, setSideEffectCount] = useState([]);

  const [manufacturerPatient, setManufacturerPatient] = useState("");
  const [patientCount, setPatientCount] = useState([]);

  async function countSideEffects() {
    axios
      .get(
        `http://localhost:5000/api/v1/manufacturer/side_effect/${manufacturerSideEffect}`
      )
      .then((response) => {
        setSideEffectCount(response.data);
      });
  }

  async function countPatients() {
    axios
      .get(
        `http://localhost:5000/api/v1/manufacturer/patient/${manufacturerPatient}`
      )
      .then((response) => {
        setPatientCount(response.data);
      });
  }

  function sideEffectCountTable(): JSX.Element {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Number of Side Effects</th>
            </tr>
          </thead>
          <tbody>
            {sideEffectCount.map((sideEffect) => (
              <tr>
                <td>{sideEffect["count(*)"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function patientCountTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Number of Patients</th>
            </tr>
          </thead>
          <tbody>
            {patientCount.map((sideEffect) => (
              <tr>
                <td>{sideEffect["count(*)"]}</td>
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
                <Card.Title>Get side effect count from manufacturer</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="form">
                    <Form.Label column="sm">Manufacturer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Manufacturer"
                      value={manufacturerSideEffect}
                      onChange={(e) =>
                        setManufacturerSideEffect(e.target.value)
                      }
                    />
                  </Form.Group>
                  <Button
                    variant="dark"
                    type="button"
                    size="sm"
                    className={styles.button}
                    onClick={countSideEffects}
                  >
                    Search
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>{sideEffectCount.length > 0 && sideEffectCountTable()}</Col>
        </Row>
        <Row className="m-5">
          <Col>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title>Get patient count from manufacturer</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="form">
                    <Form.Label column="sm">Manufacturer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Manufacturer"
                      value={manufacturerPatient}
                      onChange={(e) => setManufacturerPatient(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="dark"
                    type="button"
                    size="sm"
                    className={styles.button}
                    onClick={countPatients}
                  >
                    Search
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>{patientCount.length > 0 && patientCountTable()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Manufacturer;
