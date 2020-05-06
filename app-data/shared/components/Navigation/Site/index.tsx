import React, { FC, useState } from 'react';
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

import { ILinkItem } from './TS/Navigation.interface';

const LinkItem: FC<ILinkItem> = ({ href, title }) => (
  <NavItem>
    <NavLink
      className="text-uppercase letter-spacing-1 nav-link-main"
      href={href}
    >
      {title}
    </NavLink>
  </NavItem>
);
const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle: () => void = () => setIsOpen(!isOpen);

  return (
    <Wrapper id="navigation">
      <Navbar className="bg-white" expand="md">
        <Container fluid>
          <Row className="w-100">
            <Col md="4" xs="12">
              <NavbarBrand href="/">
                <Logo src="/images/logo.png" alt="Červený kláštor" />
              </NavbarBrand>
            </Col>
            <Col md="8" xs="12" className="d-flex align-items-center">
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <LinkItem href="/" title="Domov" />
                  <LinkItem href="/eshop" title="Produkty" />
                  <LinkItem href="/" title="Služby" />
                  <LinkItem href="/" title="O nás" />
                  <LinkItem href="/" title="FAQ" />
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
