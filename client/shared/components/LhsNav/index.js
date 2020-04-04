import React from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'reactstrap';

import Wrapper from './styles';

const LhsNav = () => (
  <Wrapper className="position-sticky">
    <Nav vertical>
      <NavItem>e-Commerce</NavItem>
      <NavItem>
        <Link href="/admin/products">
          <NavLink href="/admin/products">
            Products
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/orders">
          <NavLink href="/admin/orders">
            Orders
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/customers">
          <NavLink href="/admin/custoers">
            Customers
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/reviews">
          <NavLink href="/admin/reviews">
            Reviews
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/settings">
          <NavLink href="/admin/settings">
            Shop Settings
          </NavLink>
        </Link>
      </NavItem>
    </Nav>
  </Wrapper>
);

export default LhsNav;
