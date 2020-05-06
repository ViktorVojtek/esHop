import React, { FC } from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import { ILayout } from './TS/layout.interface';

const Layout: FC<ILayout> = ({ children }) => (
  <Container fluid className="admin">
    {children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
