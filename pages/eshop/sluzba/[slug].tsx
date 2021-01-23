import React from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import ProductDetailSkeleton from '../../../app-data/components/pages/eshop/components/ProductDetail/Skeleton';
import ServiceDetail from '../../../app-data/components/pages/eshop/components/Products/components/ServiceDetail';
import { SERVICE_BY_SLUG_QUERY } from '../../../app-data/graphql/query';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { error, loading, data } = useQuery(SERVICE_BY_SLUG_QUERY, {
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

  return <ServiceDetail service={data.serviceBySlug} />;
};

export default ProductDetailPage;
