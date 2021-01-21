import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { Element } from 'react-scroll';
import { Row } from 'reactstrap';
import { SERVICES_QUERY } from '../../../../../graphql/query';
import CustomSpinner from '../../../../../shared/components/CustomSpinner/CustomerSpinner';
import Service from '../../../../../shared/types/Service.types';
import Stays from '../Stays';
import { IGiftCardData } from '../Stepper';

type IStaysTypeType = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

const StaysType: FC<IStaysTypeType> = ({ formData, setFormData }) => {
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
    service.type = 'pobyt';
    const newArray = [...diffArray, service];
    setFormData({
      ...formData,
      totalPrice: formData.priceValue + getPrice(newArray),
      services: newArray,
    });
  };

  const pobyty = services.map((item: Service) => {
    return (
      item.subCategory.title === 'Pobyty' && (
        <Stays key={item.title} service={item} addProcedure={addProcedure} />
      )
    );
  });

  return (
    <Element name="content">
      <Row id="content">{pobyty}</Row>
    </Element>
  );
};

export default StaysType;
