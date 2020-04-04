import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Logo, Wrapper } from './styles';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Wrapper>
      <Navbar className="bg-white" expand="md">
        <Container fluid>
          <Row className="w-100">
            <Col lg="4" md="12">
              <NavbarBrand href="/"><Logo src="./images/logo.png" alt="Červený kláštor"/></NavbarBrand>
            </Col>
            <Col lg="8" md="12" className="d-flex align-items-center" >
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1" href="/">Domov</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1" href="/">Produkty a služby</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1" href="/">Kontakt</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1" href="/">FAQ</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </Wrapper>
  );
};

export default Navigation;
