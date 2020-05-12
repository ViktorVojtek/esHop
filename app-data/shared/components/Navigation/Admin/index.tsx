import React, { FC, useState } from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { logout } from '../../../../lib/auth';

const NavHeader: FC = () => {
  const [isOpen, toggle] = useState(false);

  return (
    <Navbar className="position-sticky border-bottom mb-2" expand="md">
      <NavbarBrand href="/">
        <img className="admin-logo" src="/images/logo.png" alt="Červený kláštor" />
      </NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button onClick={logout}>Log Out</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavHeader;
