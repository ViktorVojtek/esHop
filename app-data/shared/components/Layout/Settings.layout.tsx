import React, { FC } from 'react';
import { Container, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import LhsNav from '../LhsNav';
import { ILayout } from './TS/layout.interface';

import NavHeader from '../Navigation/Admin';

const Layout: FC<ILayout> = ({ children }) => (
  <div className="admin">
    <NavHeader />
    <Container fluid>
      <Row>
        <Col xs="6" sm="3" md="2">
          <LhsNav />
        </Col>
        <Col xm="6" sm="9" md="10" lg="8">
          {children}
        </Col>
      </Row>
    </Container>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
