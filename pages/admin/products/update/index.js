import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col } from 'reactstrap';

import { PRODUCT_QUERY } from '../../../../client/app-data/graphql/query';

import { withAuthSync } from '../../../../client/app-data/lib/auth';

import Layout from '../../../../client/shared/components/Layout';
import NavHeader from '../../../../client/shared/components/NavHeader';
import LhsNav from '../../../../client/shared/components/LhsNav';

import ProductForm from '../../../../client/components/pages/admin/products/create/ProductCreateForm';

const UpdateProduct = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
  });

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>loading</>;
  }

  const { product } = data;

  return (
    <>
      <Head>
        <title>esHop App | Product create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {' '}
      <NavHeader />
      {' '}
      <Layout>
        <Row>
          <Col xs="6" sm="3">
            <LhsNav />
          </Col>
          <Col xs="6" sm="9">
            <h3>Update Product</h3>
            <ProductForm productDataProp={product} />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default withAuthSync(UpdateProduct);
