import React from 'react';
import { logout } from '../../../../client/app-data/lib/auth';
import { Nav, NavWrapper } from './styles';

const NavHeader = () => (
  <NavWrapper>
    <Nav>
      <li>esHop</li>
      <li>
        <button type="button" onClick={() => logout()}>Log Out</button>
      </li>
    </Nav>
  </NavWrapper>
);

export default NavHeader;
