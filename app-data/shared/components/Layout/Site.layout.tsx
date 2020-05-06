import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { ILayout } from './TS/layout.interface';

import Navigation from '../Navigation/Site';
import Footer from '../Footer';

const Layout: FC<ILayout> = ({ children }) => (
  <>
    <Navigation />
    <div>{children}</div>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
