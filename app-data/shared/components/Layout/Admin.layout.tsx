import React, { FC } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import { ILayout } from './TS/layout.interface';

import NavHeader from '../Navigation/Admin';

const Layout: FC<ILayout> = ({ children }) => (
  <div className="admin">
    <NavHeader />
    <Container fluid>{children}</Container>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
