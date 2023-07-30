import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Link as ScrollLink} from 'react-scroll';
import logo from '../logo.png';

function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Navbar.Brand as={NavLink} to="/">&nbsp;&nbsp; <img style={{width:"40px", height:"40px", margin:"0px", padding:"0px"}} src={logo} alt='logo'/> &nbsp;&nbsp;Learning Path</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll>
        </Nav>
        <Nav>
          <Nav.Link as={ScrollLink} to="about" smooth={true} duration={100} style={{cursor:"pointer"}}>About</Nav.Link>
          <Nav.Link as={NavLink} to="/progress">Progress</Nav.Link>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
