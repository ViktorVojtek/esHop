import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import { Logo, Wrapper } from './styles';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return(
    <Wrapper>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><Logo src="./images/logo.png" alt="Červený kláštor"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Domov</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Produkty a služby</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Kontakt</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">FAQ</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Wrapper>
  );
};

export default Navigation;