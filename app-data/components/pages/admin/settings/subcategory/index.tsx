import React from 'react';

import Layout from '../../../../../shared/components/Layout/Settings.layout';
import Form from './components/SubCategorySubmitForm';
import List from './components/SubCategories';
import { PaddedWrapper } from '../styles/settings.style';

const SubcategoryContentPage: () => JSX.Element = () => (
  <Layout>
    <h3 className="pl-3 mt-2 mb-5">Subcategory settings</h3>
    <PaddedWrapper>
      <Form />
    </PaddedWrapper>
    <PaddedWrapper>
      <List />
    </PaddedWrapper>
  </Layout>
);

export default SubcategoryContentPage;
