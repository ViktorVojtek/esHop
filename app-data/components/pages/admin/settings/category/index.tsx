import React from 'react';

import Layout from '../../../../../shared/components/Layout/Settings.layout';
import Form from './components/CategorySubmitForm';
import List from './components/Categories';
import { PaddedWrapper } from '../styles/settings.style';

const CategoryPageContent: () => JSX.Element = () => (
  <Layout>
    <h3 className="pl-3 mt-2 mb-5">Category settings</h3>
    <PaddedWrapper>
      <Form />
    </PaddedWrapper>
    <PaddedWrapper>
      <List />
    </PaddedWrapper>
  </Layout>
);

export default CategoryPageContent;
