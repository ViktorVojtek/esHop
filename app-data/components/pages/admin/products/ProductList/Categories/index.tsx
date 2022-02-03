/* eslint-disable no-underscore-dangle */
import React, { Dispatch } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SUBCATEGORIES_QUERY } from '../../../../../../graphql/query';
import SubCategoriesSelect from './SubCategoriesSelect';

type AdminSubCategoriesSelectProps = {
  filteredProducts: any[];
  setFilteredProducts: Dispatch<React.SetStateAction<any[]>>;
  products: any;
};

const AdminSubCategoriesSelect = (props: AdminSubCategoriesSelectProps) => {
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <></>;
  }

  const subCategoriesArray: any = data.subCategories;

  return (
    <SubCategoriesSelect
      filteredProducts={props.filteredProducts}
      setFilteredProducts={props.setFilteredProducts}
      subCategories={subCategoriesArray}
      products={props.products}
    />
  );
};

export default AdminSubCategoriesSelect;
