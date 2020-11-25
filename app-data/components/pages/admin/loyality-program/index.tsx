import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CUSTOMERS_QUERY } from '../../../../graphql/query';
import { Button } from 'reactstrap';
import Link from 'next/link';

const LoyalityProgramContent: FC = () => {
  const { loading, error, data } = useQuery(CUSTOMERS_QUERY);

  return (
    <>
      <Link href="/admin/loyality-program/create">
        <Button color="primary" className="mb-3">
          Vytvoriť produkt
        </Button>
      </Link>
    </>
  );
};

export default LoyalityProgramContent;
