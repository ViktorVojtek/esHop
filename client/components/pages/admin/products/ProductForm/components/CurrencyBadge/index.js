import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { InputGroupText } from 'reactstrap';

import { CURRENCIES_QUERY } from '../../../../../../../app-data/graphql/query';

const CurrencyBadge = () => {
  const { loading, error, data } = useQuery(CURRENCIES_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { currencies } = data;

  return (
    <InputGroupText>
      {currencies
        .filter(({ defaultCurrency }) => defaultCurrency === true)
        .map(({ sign }) => sign)}
    </InputGroupText>
  );
};

export default CurrencyBadge;
