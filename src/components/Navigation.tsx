import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./components.module.css";

function Navigation() {
  function NavItem(props: { link: string; text: string }) {
    return (
      <Nav.Item className={styles.item}>
        <NavLink
          to={props.link}
          className={(isActive) =>
            styles.link + " " + (isActive ? styles.inactive : styles.inactive)
          }
          end
        >
          {props.text}
        </NavLink>
      </Nav.Item>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Nav justify className="me-auto">
            <NavItem link="/patient" text="Patient" />
            <NavItem link="/drugs" text="Drugs" />
            <NavItem link="/side_effects" text="Side Effects" />
            <NavItem link="/manufacturer" text="Manufacturer" />
            <NavItem link="/info" text="Info" />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
