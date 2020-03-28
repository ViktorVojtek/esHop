import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { logout } from '../../../app-data/lib/auth';

const NavHeader = () => {
  const [isOpen, toggle] = useState(false);

  const handleToggle = () => toggle(!isOpen);

  return (
    <Navbar className="position-sticky" expand="md">
      <NavbarBrand href="/">es&times;Hop</NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button onClick={() => logout()}>Log Out</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavHeader;
