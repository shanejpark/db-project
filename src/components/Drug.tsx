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
  async function searchManufacturer() {
    return axios
      .get(`http://localhost:5000/api/v1/drugs/manufacturer/${drugName}`)
      .then((response) => {
        setManufacturers(response.data);
      });
  }

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
        <Col>{manufacturerTable()}</Col>
      </Container>
    </div>
  );
}

export default Drug;
