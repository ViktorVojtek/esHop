import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LOYALITY_PRODUCTS_QUERY } from '../../../../graphql/query';
import { Button, Row } from 'reactstrap';
import Link from 'next/link';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';
import LoyalityProduct from './LoyalityProduct';

const LoyalityProgramContent: FC = () => {
  const { error, loading, data } = useQuery(LOYALITY_PRODUCTS_QUERY, {
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const { loyalityProducts } = data;

  return (
    <>
      <Link href="/admin/loyality-program/create">
        <Button color="primary" className="mb-3">
          Vytvoriť produkt
        </Button>
      </Link>
      <Row>
        {loyalityProducts.map((product, i) => (
          <LoyalityProduct loyalityProduct={product} key={i} />
        ))}
      </Row>
    </>
  );
};

export default LoyalityProgramContent;
