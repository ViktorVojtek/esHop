import React from 'react';

import { Nav, NavItem, Wrapper } from './styles';

const LhsNav = () => (
  <Wrapper>
    <Nav>
      <NavItem>Categories</NavItem>
      <NavItem>Sub Categories</NavItem>
      <NavItem>Products</NavItem>
    </Nav>
    <Nav>
      <NavItem>Shop Settings</NavItem>
      <NavItem>Currency</NavItem>
    </Nav>
  </Wrapper>
);

export default LhsNav;
