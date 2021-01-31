import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Element } from 'react-scroll';
import { SERVICES_QUERY } from '../../../../../graphql/query';
import CustomSpinner from '../../../../../shared/components/CustomSpinner/CustomerSpinner';
import Service from '../../../../../shared/types/Service.types';
import Procedures from '../Procedures';
import { IGiftCardData } from '../Stepper';
import SwiperCarousel from '../Swiper';
import { StyledElement } from '../../styles';

type IProceduresType = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

const ProceduresType: FC<IProceduresType> = ({ formData, setFormData }) => {
  const { loading, error, data } = useQuery(SERVICES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const { services } = data;

  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };

  const addProcedure = (service) => {
    const sameArray = formData.services.filter(
      (item) => item.title === service.title
    );
    const diffArray = formData.services.filter(
      (item) => item.title !== service.title
    );
    if (sameArray.length > 0) {
      let mergeCount = Number(service.count) + Number(sameArray[0].count);
      service.count = mergeCount;
    }
    service.type = 'procedura';
    const newArray = [...diffArray, service];
    setFormData({
      ...formData,
      totalPrice: formData.priceValue + getPrice(newArray),
      services: newArray,
    });
  };

  const proceduryArray = services.filter((item: Service) =>
    item.subCategory.title.includes('rocedúry')
  );

  const procedury = proceduryArray.map((item: Service) => {
    return (
      <SwiperSlide key={item.title}>
        <Procedures service={item} addProcedure={addProcedure} />
      </SwiperSlide>
    );
  });

  return (
    <StyledElement name="content">
      <SwiperCarousel>{procedury}</SwiperCarousel>
    </StyledElement>
  );
};

export default ProceduresType;
