import React from 'react';
import PropTypes from 'prop-types';

import Styles, { Container /* , Reset */ } from '../../styles/global.style';

const Layout = ({ children }) => (
  <>
    {/* <Reset /> */}
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
