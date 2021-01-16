import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { Row } from 'reactstrap';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import CustomSpinner from '../../../../../shared/components/CustomSpinner/CustomerSpinner';
import Product from '../../../../../shared/types/Product.types';
import Permanents from '../Permanents';
import { IGiftCardData } from '../Stepper';

type IPermanentType = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

const PermanentType: FC<IPermanentType> = ({ formData, setFormData }) => {
  const { error, loading, data } = useQuery(PRODUCTS_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  console.log(data);

  const { products } = data;

  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };

  const addPermanent = (permament) => {
    const sameArray = formData.services.filter(
      (item) => item.title === permament.title
    );
    const diffArray = formData.services.filter(
      (item) => item.title !== permament.title
    );
    if (sameArray.length > 0) {
      let mergeCount = Number(permament.count) + Number(sameArray[0].count);
      permament.count = mergeCount;
    }
    permament.type = 'permanentka';
    const newArray = [...diffArray, permament];
    setFormData({
      ...formData,
      totalPrice: formData.priceValue + getPrice(newArray),
      services: newArray,
    });
  };

  const procedury = products.map((item: Product) => {
    return (
      item.subCategory.title === 'Permanentky' && (
        <Permanents
          key={item.title}
          permanent={item}
          addPermanent={addPermanent}
        />
      )
    );
  });

  return <Row id="content">{procedury}</Row>;
};

export default PermanentType;
