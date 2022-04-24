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

  async function loadSideEffects() {
    return fetch("http://localhost:3000/api/v1/patient")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setSideEffects(myJson);
      });
  }

  async function searchPatientDrug() {
    axios
      .get(
        `http://localhost:3000/api/v1/patient/searchRecord/${patientName}/${drugName}`
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
                <td>sideEffect.name</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function Filter() {
    return (
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
    );
  }

  return (
    <>
      <div className={styles.filter}>
        <Container>
          <Row className="mx-3">
            <Filter />
            {sideEffects.length > 0 && table()}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Patient;
