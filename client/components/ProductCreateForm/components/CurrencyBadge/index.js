import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';

import { CURRENCIES_QUERY } from '../../../../app-data/graphql/query';

const CurrencyBadge = ({ productData, handleProductData }) => {
  const { loading, error, data } = useQuery(CURRENCIES_QUERY);

  useEffect(() => {
    if (data && data.currencies) {
      const newProductData = {
        ...productData,
        price: {
          ...productData.price,
          currency: data.currencies
            .filter(({ defaultCurrency }) => defaultCurrency === true)
            .map(({ title }) => title)
            .pop(),
          currencySign: data.currencies
            .filter(({ defaultCurrency }) => defaultCurrency === true)
            .map(({ sign }) => sign)
            .pop(),
        },
      };

      handleProductData(newProductData);
    }
  }, [data]);

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

CurrencyBadge.propTypes = {
  productData: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    discount: PropTypes.number,
    inStock: PropTypes.number,
    modifiedByUserId: PropTypes.string,
    shortDescription: PropTypes.string,
    subCategory: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    note: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      currencySign: PropTypes.string,
      value: PropTypes.number,
    }),
  }).isRequired,
  handleProductData: PropTypes.func.isRequired,
};

export default CurrencyBadge;
