import React from 'react';
import Navigation from '../../app-data/shared/components/Navigation/Site';
import Footer from '../../app-data/shared/components/Footer';
import EshopPage from '../../app-data/components/pages/EshopPage';

const Eshop: () => JSX.Element = () => (
  <>
    <Navigation />
    <EshopPage />
    <Footer />
  </>
);

export default Eshop;
