import React from 'react';
import { logout } from '../../../../client/app-data/lib/auth';
import { Nav, NavItem, NavWrapper } from './styles';

const NavHeader = () => (
  <NavWrapper>
    <Nav>
      <NavItem>esHop</NavItem>
      <NavItem>
        <button type="button" onClick={() => logout()}>Log Out</button>
      </NavItem>
    </Nav>
  </NavWrapper>
);

export default NavHeader;
