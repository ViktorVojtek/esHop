/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import AdminProductList from './AdminProductList';

const ProductList: FC = () => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }
  const { products } = data.products;

  return (
    <>
      <AdminProductList productsData={data} />
    </>
  );
};

export default ProductList;
