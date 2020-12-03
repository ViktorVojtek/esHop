import React from 'react';

import Intro from './Intro';
import ProductsMP from './ProductsMP';
import Doctors from './Doctors';
import ContactUs from './ContactUs';
import KupeleCks from './KupeleCks';

const MainPage: () => JSX.Element = () => (
  <>
    <Intro />
    <ProductsMP />
    {/*<Doctors />*/}
    <KupeleCks />
    <ContactUs />
  </>
);

export default MainPage;
