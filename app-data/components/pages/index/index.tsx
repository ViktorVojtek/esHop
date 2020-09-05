import React from 'react';

import Intro from './Intro';
import ProductsMP from './ProductsMP';
import Doctors from './Doctors';
import ContactUs from './ContactUs';

const MainPage: () => JSX.Element = () => (
  <>
    <Intro />
    <ProductsMP />
    <Doctors />
    <ContactUs />
  </>
);

export default MainPage;
