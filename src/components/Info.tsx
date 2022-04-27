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
  const [drugName, setDrugName] = useState("");
  const [manufacturers, setManufacturers] = useState([]);

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

  async function searchManufacturer() {
    return get(
      `http://localhost:5000/api/v1/drugs/manufacturer/${drugName}`,
      setManufacturers
    );
  }

  useEffect(() => {
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

  function patientsJaundiceRiskTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={4}>
                Patients at risk of developing Jaundice as Side Effect
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Drug Name</th>
            </tr>
          </thead>
          <tbody>
            {patientsJaundiceRisk.map((drug) => (
              <tr>
                <td>{drug["name"]}</td>
                <td>{drug["prescribed"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function averagePatientTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={4}>
                Average statistics of patient who is treated for a fever
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Average Age</th>
              <th>Average Weight (lbs)</th>
              <th>Average Height (in)</th>
            </tr>
          </thead>
          <tbody>
            {averagePatient.map((drug) => (
              <tr>
                <td>{drug["avg_age"]}</td>
                <td>{drug["avg_weight"]}</td>
                <td>{drug["avg_height"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function allPatientInfoTable() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th colSpan={8}>
                Every Single Patient, the drugs they're taking, and side effects
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient Age</th>
              <th>Condition</th>
              <th>Condition Name</th>
              <th>Condition Cause</th>
              <th>Drug Name</th>
              <th>Dosage</th>
              <th>Side Effect</th>
            </tr>
          </thead>
          <tbody>
            {allPatientInfo.map((drug) => (
              <tr>
                <td>{drug["patient"]}</td>
                <td>{drug["age"]}</td>
                <td>{drug["condition"]}</td>
                <td>{drug["cause"]}</td>
                <td>{drug["drug"]}</td>
                <td>{drug["dosage"]}</td>
                <td>{drug["condition"]}</td>
                <td>{drug["side_effect"]}</td>
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
        <Row className="m-5">{allPatientInfoTable()}</Row>
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
        <Row className="m-5">{mostSideEffectsTable()}</Row>
        <Row className="m-5">{patientAlwaysSideTable()}</Row>
        <Row className="m-5">{allSideEffectsTable()}</Row>
        <Row className="m-5">{digestiveSideEffectsTable()}</Row>
        <Row className="m-5">{noSideEffectsTable()}</Row>
        <Row className="m-5">{severeSideEffectsTable()}</Row>
        <Row className="m-5">{drugsFrom2022Table()}</Row>
        <Row className="m-5">{averageNonGenPriceTable()}</Row>
        <Row className="m-5">{patientsJaundiceRiskTable()}</Row>
        <Row className="m-5">{averagePatientTable()}</Row>
      </Container>
    </div>
  );
}

export default Info;
