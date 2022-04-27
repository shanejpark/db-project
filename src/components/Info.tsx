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

function Info() {
  const [mostSideEffects, setMostSideEffects] = useState([]);
  const [patientsAlwaysSide, setPatientsAlwaysSide] = useState([]);
  const [allSideEffects, setAllSideEffects] = useState([]);
  const [digestiveSideEffects, setDigestiveSideEffects] = useState([]);
  const [noSideEffects, setNoSideEffects] = useState([]);
  const [severeSideEffects, setSevereSideEffects] = useState([]);
  const [drugsFrom2022, setdrugsFrom2022] = useState([]);
  const [averageNonGenPrice, setAverageNonGenPrice] = useState([]);
  const [patientsJaundiceRisk, setPatientsJaundiceRisk] = useState([]);
  const [averagePatient, setAveragePatient] = useState([]);
  const [allPatientInfo, setAllPatientInfo] = useState([]);

  async function get(url: string, func: Function) {
    return axios.get(url).then((response) => {
      func(response.data);
    });
  }

  async function getInfo() {
    get(
      `http://localhost:5000/api/v1/info/mostSideEffects`,
      setMostSideEffects
    );
    get(
      `http://localhost:5000/api/v1/info/patientsAlwaysSide`,
      setPatientsAlwaysSide
    );
    get(`http://localhost:5000/api/v1/info/allSideEffects`, setAllSideEffects);
    get(
      `http://localhost:5000/api/v1/info/digestiveSideEffects`,
      setDigestiveSideEffects
    );
    get(`http://localhost:5000/api/v1/info/noSideEffects`, setNoSideEffects);
    get(
      `http://localhost:5000/api/v1/info/severeSideEffects`,
      setSevereSideEffects
    );
    get(`http://localhost:5000/api/v1/info/drugsFrom2022`, setdrugsFrom2022);
    get(
      `http://localhost:5000/api/v1/info/averageNonGenPrice`,
      setAverageNonGenPrice
    );
    get(
      `http://localhost:5000/api/v1/info/patientsJaundiceRisk`,
      setPatientsJaundiceRisk
    );
    get(`http://localhost:5000/api/v1/info/averagePatient`, setAveragePatient);
    get(`http://localhost:5000/api/v1/info/allPatientInfo`, setAllPatientInfo);
  }

  useEffect(() => {
    getInfo();
  }, []);

  function mostSideEffectsTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Patient with most side effects</th>
            </tr>
          </thead>
          <tbody>
            {mostSideEffects.map((patient) => (
              <tr>
                <td>{patient["name"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function allSideEffectsTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={3}>Drugs and all their side effects</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Common Name</th>
              <th>Side Effects</th>
            </tr>
          </thead>
          <tbody>
            {allSideEffects.map((drug) => (
              <tr>
                <td>{drug["drug"]}</td>
                <td>{drug["common_name"]}</td>
                <td>{drug["side_effect"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function digestiveSideEffectsTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={4}>List of Digestive Side Effects</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Patient Name</th>
              <th>Side Effect</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {digestiveSideEffects.map((drug) => (
              <tr>
                <td>{drug["drug"]}</td>
                <td>{drug["patient"]}</td>
                <td>{drug["side_effect"]}</td>
                <td>{drug["severity"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function patientAlwaysSideTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={3}>How many patients experience issues per drug?</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Common Name</th>
              <th>Number of Side Effects</th>
            </tr>
          </thead>
          <tbody>
            {patientsAlwaysSide.map((drug) => (
              <tr>
                <td>{drug["drug"]}</td>
                <td>{drug["common_name"]}</td>
                <td>{drug["num_patients"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function severeSideEffectsTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={3}>Drugs that cause severe side effects</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Common Name</th>
              <th>Side Effect</th>
            </tr>
          </thead>
          <tbody>
            {severeSideEffects.map((drug) => (
              <tr>
                <td>{drug["medical_name"]}</td>
                <td>{drug["common_name"]}</td>
                <td>{drug["side_effect"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function noSideEffectsTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={3}>Drugs With No Side Effects</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Common Name</th>
              <th>Formula</th>
            </tr>
          </thead>
          <tbody>
            {noSideEffects.map((drug) => (
              <tr>
                <td>{drug["medical_name"]}</td>
                <td>{drug["common_name"]}</td>
                <td>{drug["formula"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function drugsFrom2022Table() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={2}>Drugs prescribed in 2022</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {drugsFrom2022.map((drug) => (
              <tr>
                <td>{drug["medical_name"]}</td>
                <td>{drug["dosage"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function averageNonGenPriceTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={4}>Average price of non-generic drugs</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Medical Name</th>
              <th>Common Name</th>
              <th>Formula</th>
              <th>Average Price</th>
            </tr>
          </thead>
          <tbody>
            {averageNonGenPrice.map((drug) => (
              <tr>
                <td>{drug["medical_name"]}</td>
                <td>{drug["common_name"]}</td>
                <td>{drug["formula"]}</td>
                <td>{drug["avg_price"]}</td>
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
        <Row className="m-5">{mostSideEffectsTable()}</Row>
        <Row className="m-5">{patientAlwaysSideTable()}</Row>
        <Row className="m-5">{allSideEffectsTable()}</Row>
        <Row className="m-5">{digestiveSideEffectsTable()}</Row>
        <Row className="m-5">{noSideEffectsTable()}</Row>
        <Row className="m-5">{severeSideEffectsTable()}</Row>
        <Row className="m-5">{drugsFrom2022Table()}</Row>
        <Row className="m-5">{averageNonGenPriceTable()}</Row>
      </Container>
    </div>
  );
}

export default Info;
