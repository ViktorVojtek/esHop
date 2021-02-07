import React from 'react';

import Intro from './Intro';
import ProductsMP from './ProductsMP';
import Doctors from './Doctors';
import ContactUs from './ContactUs';
import KupeleCks from './KupeleCks';
import { Slideshow } from './Slideshow';
import Services from './Intro/components/Services';

const MainPage: () => JSX.Element = () => (
  <>
    <Slideshow />
    <Services />
    <ProductsMP />
    {/*<Doctors />*/}
    {/*<KupeleCks />*/}
    {/*<ContactUs />*/}
  </>
);

export default MainPage;
