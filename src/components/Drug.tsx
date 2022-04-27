import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container, Table } from "react-bootstrap";
import styles from "./components.module.css";
import axios from "axios";

function Drug() {
  const [drugs, setDrugs] = useState([]);

  async function loadDrugs() {
    return axios.get("http://localhost:5000/api/v1/drugs").then((response) => {
      setDrugs(response.data);
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

  return (
    <div className={styles.filter}>
      <Container className={styles.containerBlock}>
        <Row className="m-5">{listAllDrugs()}</Row>
      </Container>
    </div>
  );
}

export default Drug;
