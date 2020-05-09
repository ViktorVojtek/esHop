import React from 'react';

import Layout from '../../../../../shared/components/Layout/Settings.layout';
import Form from './components/CurrencySubmitForm';
import List from './components/Currencies';
import { PaddedWrapper } from '../styles/settings.style';

const CurrencyPageContent = () => (
  <Layout>
    <h3 className="pl-3 mt-2 mb-5">Currency settings</h3>
    <PaddedWrapper>
      <Form />
    </PaddedWrapper>
    <PaddedWrapper>
      <List />
    </PaddedWrapper>
  </Layout>
);

export default CurrencyPageContent;
