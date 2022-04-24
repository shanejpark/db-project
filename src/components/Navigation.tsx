import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./components.module.css";

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Nav justify className="me-auto">
            <Nav.Item className={styles.item}>
              <NavLink to="/patient" className={styles.class}>
                Patient
              </NavLink>
            </Nav.Item>
            <Nav.Item className={styles.item}>
              <NavLink to="/drugs" className={styles.class}>
                Drugs
              </NavLink>
            </Nav.Item>
            <Nav.Item className={styles.item}>
              <NavLink to="/condition" className={styles.class}>
                Condition
              </NavLink>
            </Nav.Item>
            <Nav.Item className={styles.item}>
              <NavLink to="/manufacturor" className={styles.class}>
                Manufacturor
              </NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
