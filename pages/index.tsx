import React from 'react';
import Navigation from '../app-data/shared/components/Navigation/Site';
import MainPage from '../app-data/components/pages/MainPage';
import Footer from '../app-data/shared/components/Footer';

const Home: () => JSX.Element = () => (
  <>
    <Navigation />
    <MainPage />
    <Footer />
  </>
);

export default Home;
