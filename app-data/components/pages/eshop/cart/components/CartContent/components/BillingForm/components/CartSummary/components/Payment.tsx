import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../../../../../../../lib/state/Store';
import { PAYMENT_METHODES_QUERY } from '../../../../../../../../../../../graphql/query';
import { Col, Row, FormGroup, Input, Label } from 'reactstrap';
import { formatPrice } from '../../../../../../../../../../../shared/helpers/formatters';

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
  paymentMethode: string;
  paymentPrice: number;
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
    state: { cart, giftCards, loyalityProduct },
    dispatch,
  } = useContext(Context);
  const { error, loading, data } = useQuery(PAYMENT_METHODES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return null;
  }

  const handleChangePayment: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    let sum: number = 0;
    const currentValue: number = parseFloat(
      event.currentTarget.getAttribute('data-value')
    );
    const deliveryEls: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.payment-data-input'
    );

    deliveryEls.forEach((item: HTMLInputElement) => {
      item.checked = false;
    });

    event.currentTarget.checked = true;

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

    if (loyalityProduct && loyalityProduct.isDiscount) {
      sum = sum - sum * (loyalityProduct.discount / 100);
    }

    sum += currentValue;

    document.querySelectorAll('.delivery-data-input').forEach((item) => {
      if ((item as HTMLInputElement).checked) {
        sum += +item.getAttribute('data-value') as number;
      }
    });

    sum = Math.round(sum * 100) / 100;

    handleData({
      ...orderData,
      totalPrice: sum,
      paymentMethode: event.currentTarget.id,
      paymentPrice: currentValue,
    });
    dispatch({
      type: 'SET_TOTAL_SUM',
      payload: sum, // currentValue === 0 ? sum : cartTotalSum + currentValue,
    });
  };

  const { paymentMethodes } = data;

  const paymentMethodsEl: JSX.Element[] =
    paymentMethodes && paymentMethodes.length > 0 ? (
      paymentMethodes.map(
        (
          {
            _id,
            title,
            value,
          }: {
            _id: string;
            title: string;
            value: number;
          },
          i: number
        ) => {
          return (
            <Row form key={_id}>
              <Col md={6}>
                <FormGroup>
                  <FormGroup check>
                    <Label htmlFor={title.toLowerCase()}>
                      <Input
                        type="radio"
                        name="paymentMethods"
                        id={title.toLowerCase()}
                        className="payment-data-input"
                        onChange={handleChangePayment}
                        data-value={value}
                        required
                      />{' '}
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
          <p>No payment methodes configured in the shop.</p>
        </Col>
      </Row>
    );

  return (
    <>
      <h5 className="mb-4">Zvoľte spôsob platby</h5>
      {paymentMethodsEl}
    </>
  );
};
