import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavLink key={"Patient"} to={"/"}>
          Patient
        </NavLink>
        <NavLink key={"Drugs"} to={"/drugs"}>
          Drugs
        </NavLink>
        <NavLink key={"Condition"} to={"/condition"}>
          Condition
        </NavLink>
        <NavLink key={"Manufacturor"} to={"/manufacturor"}>
          Manufacturor
        </NavLink>
      </Navbar>
    </>
  );
}

export default Navigation;
