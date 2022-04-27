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

function Drug() {
  const [drugName, setDrugName] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [drugs, setDrugs] = useState([]);

  async function loadDrugs() {
    return axios.get("http://localhost:5000/api/v1/drugs").then((response) => {
      setDrugs(response.data);
    });
  }

  async function searchManufacturer() {
    return axios
      .get(`http://localhost:5000/api/v1/drugs/manufacturer/${drugName}`)
      .then((response) => {
        setManufacturers(response.data);
      });
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
                <td>{drug["generic"]}</td>
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

  function manufacturerTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Manufacturers</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer) => (
              <tr>
                <td>{manufacturer["name"]}</td>
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
        <Row className="m-5">{listAllDrugs()}</Row>
        <Row className="m-5">
          <Col>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title>Get side effects</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="form">
                    <Form.Label column="sm">Drug</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Drug"
                      value={drugName}
                      onChange={(e) => setDrugName(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="dark"
                    type="button"
                    size="sm"
                    className={styles.button}
                    onClick={searchManufacturer}
                  >
                    Search
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>{manufacturers.length > 0 && manufacturerTable()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Drug;
