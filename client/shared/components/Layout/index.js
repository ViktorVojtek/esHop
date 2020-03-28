import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import Styles from '../../styles/global.style';

const Layout = ({ children }) => (
  <>
    <Styles />
    {/* */}
    <Container fluid>
      {children}
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
