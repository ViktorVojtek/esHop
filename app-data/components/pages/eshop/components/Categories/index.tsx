/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES_QUERY } from '../../../../../graphql/query';
import CategoriesUI from './CategoriesUI';

const CategoriesAside: FC = () => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <></>;
  }

  const { categories } = data;

  return <CategoriesUI categories={categories} />;
};

export default CategoriesAside;
