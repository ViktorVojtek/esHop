import React, { FC } from 'react';
import { Span, P, Circle, Text, Remove } from '../../styles/index';
import { formatPrice } from '../../../../../shared/helpers/formatters';

type ServiceData = {
  title: string;
  price: number;
  count: number;
};

type FormData = {
  cardColor: string;
  priceValue: number;
  text: string;
  services: ServiceData[];
};

type IProductToCartData = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const Summary: FC<IProductToCartData> = ({ formData, setFormData }) => {
  const { cardColor, priceValue, text, services } = formData;

  const removeProcedure = (value: number) => {
    let newServices = [...services];
    newServices.splice(value, 1);
    setFormData({
      ...formData,
      priceValue: getPrice(newServices),
      services: newServices,
    });
  };
  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };

  return (
    <>
      <P className="d-flex mt-4">
        Farba:
        <Circle className="ml-2" color={cardColor} />
      </P>
      <P>
        Venovanie: <Span className="ml-1">{text}</Span>
      </P>
      <P>Zvolené služby:</P>
      {services.length > 0 ? (
        <>
          {services.map((item, i) => {
            return (
              <div key={i} className="d-flex">
                <Text>{`${item.title} - `}</Text>
                <Text className="ml-1">{`${formatPrice(item.price)} € x ${
                  item.count
                }`}</Text>
                <Remove onClick={() => removeProcedure(i)} />
              </div>
            );
          })}
        </>
      ) : (
        <Text>Nemáte zvolené služby</Text>
      )}

      <P>
        Cena:{' '}
        <Span className="ml-1">{`${formatPrice(Number(priceValue))} €`}</Span>
      </P>
    </>
  );
};

export default Summary;
