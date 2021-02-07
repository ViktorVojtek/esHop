import React, { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import Product from '../../../../../shared/types/Product.types';
import { StyledElement } from '../../styles';
import { Products } from '../Products';
import { IGiftCardData } from '../Stepper';
import SwiperCarousel from '../Swiper';

type IProductType = {
  products: Product[];
  category: string;
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

export const ProductType: FC<IProductType> = ({
  formData,
  setFormData,
  products,
  category,
}) => {
  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };

  const addProduct = (product) => {
    const sameArray = formData.services.filter(
      (item) => item.title === product.title
    );
    const diffArray = formData.services.filter(
      (item) => item.title !== product.title
    );
    if (sameArray.length > 0) {
      let mergeCount = Number(product.count) + Number(sameArray[0].count);
      product.count = mergeCount;
    }
    product.type = 'permanentka';
    const newArray = [...diffArray, product];
    setFormData({
      ...formData,
      totalPrice: formData.priceValue + getPrice(newArray),
      services: newArray,
    });
  };

  const productsArray = products.filter(
    (product: Product) => product.subCategory.id === category
  );
  const productsToShow = productsArray.map((item: Product) => {
    if (item.variants.length === 1) {
      return (
        <SwiperSlide key={item.title}>
          <Products variant={0} product={item} addProduct={addProduct} />
        </SwiperSlide>
      );
    } else {
      const fields: JSX.Element[] = [];
      for (let i = 0; i < item.variants.length; i++) {
        fields.push(
          <SwiperSlide key={item.variants[i].title}>
            <Products variant={i} product={item} addProduct={addProduct} />
          </SwiperSlide>
        );
      }
      return fields;
    }
  });

  return (
    <StyledElement name="content">
      <SwiperCarousel>{productsToShow}</SwiperCarousel>
    </StyledElement>
  );
};
