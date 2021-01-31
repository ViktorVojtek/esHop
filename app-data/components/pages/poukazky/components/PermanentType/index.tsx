import { useQuery } from '@apollo/react-hooks';
import { Element } from 'react-scroll';
import React, { FC } from 'react';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import CustomSpinner from '../../../../../shared/components/CustomSpinner/CustomerSpinner';
import Product from '../../../../../shared/types/Product.types';
import Permanents from '../Permanents';
import { IGiftCardData } from '../Stepper';
import SwiperCarousel from '../Swiper';
import { SwiperSlide } from 'swiper/react';
import { StyledElement } from '../../styles';

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

  const permanentkyArray = products.filter(
    (item: Product) => item.subCategory.title === 'Permanentky'
  );

  const procedury = permanentkyArray.map((item: Product) => {
    if (item.variants.length === 1) {
      return (
        <SwiperSlide key={item.title}>
          <Permanents
            variant={0}
            permanent={item}
            addPermanent={addPermanent}
          />
        </SwiperSlide>
      );
    } else {
      const fields: JSX.Element[] = [];
      for (let i = 0; i < item.variants.length; i++) {
        fields.push(
          <SwiperSlide key={item.variants[i].title}>
            <Permanents
              variant={i}
              permanent={item}
              addPermanent={addPermanent}
            />
          </SwiperSlide>
        );
      }
      return fields;
    }
  });

  return (
    <StyledElement name="content">
      <SwiperCarousel>{procedury}</SwiperCarousel>
    </StyledElement>
  );
};

export default PermanentType;
