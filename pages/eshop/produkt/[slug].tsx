import React, { useEffect, useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import ProductDetailSkeleton from '../../../app-data/components/pages/eshop/components/ProductDetail/Skeleton';
import { PRODUCT_BY_SLUG_QUERY } from '../../../app-data/graphql/query';
import ProductDetail from '../../../app-data/components/pages/eshop/components/Products/components/ProductDetail';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { error, loading, data } = useQuery(PRODUCT_BY_SLUG_QUERY, {
    variables: { slug: slug },
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    console.log('error');
    return <Error statusCode={404} />;
  }

  if (data) {
    console.log(data);
  }

  const { product, subCategory } = data.productBySlug;

  return <ProductDetail product={product} subCategory={subCategory} />;
};

export default ProductDetailPage;
