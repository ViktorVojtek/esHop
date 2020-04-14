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
    <Wrapper id="navigation">
      <Navbar className="bg-white" expand="md">
        <Container fluid>
          <Row className="w-100">
            <Col md="4" xs="12">
              <NavbarBrand href="/"><Logo src="./images/logo.png" alt="Červený kláštor" /></NavbarBrand>
            </Col>
            <Col md="8" xs="12" className="d-flex align-items-center" >
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1 nav-link-main" href="/">Produkty</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1 nav-link-main" href="/">Služby</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1 nav-link-main" href="/">Pobyty</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1 nav-link-main" href="/">o nás</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="text-uppercase letter-spacing-1 nav-link-main" href="/">FAQ</NavLink>
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
