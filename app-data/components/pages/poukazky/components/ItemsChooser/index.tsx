import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import MoneyType from '../MoneyType';
import { ProductType } from '../ProductType';
import { IGiftCardData } from '../Stepper';

type ItemsChooserType = {
  category: string;
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

export const ItemsChooser = (props: ItemsChooserType) => {
  const { category, formData, setFormData } = props;
  const { error, loading, data } = useQuery(PRODUCTS_QUERY);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <>{error.message}</>;
  }
  const { products } = data.products;

  return (
    <>
      {category === 'Suma' ? (
        <MoneyType formData={formData} setFormData={setFormData} />
      ) : (
        <ProductType
          formData={formData}
          setFormData={setFormData}
          products={products}
          category={category}
        />
      )}
    </>
  );
};
