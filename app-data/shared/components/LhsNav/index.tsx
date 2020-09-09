import React, { FC } from 'react';
import Link from 'next/link';
import { Nav, NavItem, NavLink } from 'reactstrap';

import Wrapper from './styles';

import { INavItem } from './TS/LhsNav.interface';
const LinkItem: FC<INavItem> = ({ href, title }) => (
  <NavItem>
    <Link href={href}>
      <NavLink className="lsnav-link"  href={href}>{title}</NavLink>
    </Link>
  </NavItem>
);

const LhsNav: () => JSX.Element = () => (
  <Wrapper className="position-sticky">
    <Nav vertical>
      <NavItem className="lsnav-head">e-Commerce</NavItem>
      <LinkItem href="/admin/products" title="Products" />
      <LinkItem href="/admin/orders" title="Orders" />
      <LinkItem href="/admin/customers" title="Customers" />
      <LinkItem href="/admin/reviews" title="Reviews" />
      <NavItem className="lsnav-head">Settings</NavItem>
      <LinkItem href="/admin/settings/category" title="Category" />
      <LinkItem href="/admin/settings/currency" title="Currency" />
      <LinkItem href="/admin/settings/delivery" title="Delivery" />
      <LinkItem href="/admin/settings/discount" title="Discount" />
      <LinkItem href="/admin/settings/payment" title="Payment" />
      <LinkItem href="/admin/settings/subcategory" title="Subcategory" />
    </Nav>
  </Wrapper>
);

export default LhsNav;
