import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../../../../../../../lib/state/Store';
import { PAYMENT_METHODES_QUERY } from '../../../../../../../../../../../graphql/query';
import { Col, Row, FormGroup, Input, Label } from 'reactstrap';
import { formatPrice } from '../../../../../../../../../../../shared/helpers/formatters';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { H4 } from '../../../../../../../styles/cart.style';

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
    state: { cart, giftCards, loyalityProduct, cartTotalSum, coupon },
    dispatch,
  } = useContext(Context);
  const { error, loading, data } = useQuery(PAYMENT_METHODES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let sum: number = 0;
    const currentMethod = paymentMethodes.find((item) => {
      if (item.title === (event.target as HTMLInputElement).value) {
        return true;
      }
    });

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
      sum += item.totalPrice;
    });

    if (loyalityProduct && loyalityProduct.isDiscount) {
      sum = sum - sum * (loyalityProduct.discount / 100);
    }
    if (coupon && coupon.value) {
      sum = sum - sum * (coupon.value / 100);
    }
    sum += orderData.deliveryPrice;
    sum += currentMethod.value;

    handleData({
      ...orderData,
      totalPrice: sum,
      paymentMethode: currentMethod.title,
      paymentPrice: currentMethod.value,
    });
    dispatch({
      type: 'SET_TOTAL_SUM',
      payload: sum, // currentValue === 0 ? sum : cartTotalSum + currentValue,
    });
  };

  const { paymentMethodes } = data;

  const paymentMethodsEl: JSX.Element =
    paymentMethodes && paymentMethodes.length > 0 ? (
      <FormControl style={{ width: '100%' }} component="fieldset">
        <RadioGroup
          aria-label="paymentMethods"
          name="paymentMethods"
          value={orderData.paymentMethode}
          onChange={handleChange}
        >
          {paymentMethodes.map(
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
                <div
                  key={_id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <FormControlLabel
                    value={title}
                    control={<Radio color="primary" required />}
                    label={title}
                  />
                  <p
                    className="text-right"
                    style={{ margin: '0', fontWeight: 'bold' }}
                  >
                    {value === 0 ? 'Zadarmo' : `${formatPrice(value)} €`}
                  </p>
                </div>
              );
            }
          )}
        </RadioGroup>
      </FormControl>
    ) : (
      <Row form>
        <Col>
          <p>No payment methodes configured in the shop.</p>
        </Col>
      </Row>
    );

  return (
    <>
      <H4 className="mb-4">Spôsob platby</H4>
      {paymentMethodsEl}
    </>
  );
};
