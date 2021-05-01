import React, { FC } from 'react';
import { SUBCATEGORIES_QUERY } from '../../../../../graphql/query';
import { useQuery } from '@apollo/react-hooks';
import CategoryUI from './CategoryUI';

interface ICategory {
  title: string;
  id: string;
}

const Category: FC<ICategory> = ({ title, id }) => {
  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: id || '' },
  });

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <></>;
  }
  const subCategoriesArray: any = data.subCategories;
  return (
    <CategoryUI title={title} id={id} subCategoriesArray={subCategoriesArray} />
  );
};

export default Category;
