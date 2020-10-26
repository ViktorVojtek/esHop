import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../../../../../../../lib/state/Store';
import { DELIVERY_METHODS_QUERY } from '../../../../../../../../../../../graphql/query';
import { Col, Row, FormGroup, Input, Label } from 'reactstrap';
import { formatPrice } from '../../../../../../../../../../../shared/helpers/formatters';
import { CartProduct } from '../../../../../../../../../../../shared/types/Store.types';

interface IData {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVatNum: string;
  companyDVATNum: string;
  companyDTAXNum: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  optionalAddress: string;
  optionalPostalCode: string;
  optionalCity: string;
  optionalState: string;
  phone: string;
  email: string;
  message: string;
  deliveryMethode: string;
  deliveryPrice: number;
  paymentMethode: string;
  totalPrice: number;
  products: string[];
}
interface IProps {
  data?: IData;
  handleData?: (data: IData) => void;
}

export default (props: IProps) => {
  const { data: orderData, handleData } = props;
  const {
    state: { cart, allowEnvelope, giftCards },
    dispatch,
  } = useContext(Context);
  const { error, loading, data } = useQuery(DELIVERY_METHODS_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return null;
  }

  const handleChangeDelivery: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    let sum: number = 0;
    const currentValue: number = parseFloat(
      event.currentTarget.getAttribute('data-value')
    );
    const deliveryEls: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.delivery-data-input'
    );

    deliveryEls.forEach((item: HTMLInputElement) => {
      item.checked = false;
    });

    event.currentTarget.checked = true;

    sum += currentValue;

    cart.forEach((item: any) => {
      if (item.variant.discount && item.variant.discount > 0) {
        sum +=
          item.variant.count *
          (item.variant.price.value -
            item.variant.price.value * (item.variant.discount / 100));
      } else {
        sum += item.variant.count * item.variant.price.value;
      }
    });

    giftCards.forEach((item: any) => {
      sum += item.price;
    });

    document.querySelectorAll('.payment-data-input').forEach((item) => {
      if ((item as HTMLInputElement).checked) {
        sum += +item.getAttribute('data-value') as number;
      }
    });

    handleData({
      ...orderData,
      totalPrice: sum,
      deliveryMethode: event.currentTarget.id,
      deliveryPrice: currentValue,
    });
    dispatch({
      type: 'SET_TOTAL_SUM',
      payload: sum, // currentValue === 0 ? sum : cartTotalSum + currentValue,
    });
  };

  const { deliveryMethods } = data;

  const deliveryMethodsEl: JSX.Element[] =
    deliveryMethods && deliveryMethods.length > 0 ? (
      deliveryMethods.map(
        (
          {
            _id,
            title,
            value,
            isEnvelopeSize,
          }: {
            _id: string;
            title: string;
            value: number;
            isEnvelopeSize: boolean;
          },
          i: number
        ) => {
          return (
            <Row form key={_id}>
              <Col md={6}>
                <FormGroup required>
                  <FormGroup check>
                    <Label htmlFor={title.toLowerCase()}>
                      {isEnvelopeSize ? (
                        <Input
                          type="radio"
                          name="deliveryMethods"
                          id={title.toLowerCase()}
                          className="delivery-data-input"
                          onChange={handleChangeDelivery}
                          data-value={value}
                          disabled={allowEnvelope ? false : true}
                        />
                      ) : (
                        <Input
                          type="radio"
                          name="deliveryMethods"
                          id={title.toLowerCase()}
                          className="delivery-data-input"
                          onChange={handleChangeDelivery}
                          data-value={value}
                          required
                        />
                      )}{' '}
                      {title}
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <p className="text-right">
                  {value === 0 ? 'Zadarmo' : `${formatPrice(value)} €`}
                </p>
              </Col>
            </Row>
          );
        }
      )
    ) : (
      <Row form>
        <Col>
          <p>No delivery methodes configured in the shop.</p>
        </Col>
      </Row>
    );

  return (
    <>
      <h5 className="mb-4">Zvoľte spôsob doručenia</h5>
      {deliveryMethodsEl}
    </>
  );
};
