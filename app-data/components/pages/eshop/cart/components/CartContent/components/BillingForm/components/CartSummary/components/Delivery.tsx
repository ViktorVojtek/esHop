import React, { useContext, useEffect } from 'react';
import { Element } from 'react-scroll';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../../../../../../../lib/state/Store';
import { DELIVERY_METHODS_QUERY } from '../../../../../../../../../../../graphql/query';
import { Col, Row } from 'reactstrap';
import { formatPrice } from '../../../../../../../../../../../shared/helpers/formatters';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Theme,
} from '@material-ui/core';
import { ErrorText, H4 } from '../../../../../../../styles/cart.style';
import { CartSummaryType } from '../../BillingInfo';

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
  setCartSummary: React.Dispatch<React.SetStateAction<CartSummaryType>>;
  cartSummary: CartSummaryType;
}

const Delivery = (props: IProps) => {
  const { data: orderData, handleData, cartSummary, setCartSummary } = props;
  const {
    state: {
      cart,
      allowEnvelope,
      giftCards,
      loyalityProduct,
      coupon,
      freeDelivery,
    },
    dispatch,
  } = useContext(Context);
  const { error, loading, data } = useQuery(DELIVERY_METHODS_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return null;
  }

  console.log(cartSummary);

  const getSum = (): number => {
    let sum: number = 0;

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
    sum += orderData.paymentPrice;
    return sum;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let sum = getSum();
    setCartSummary((prevState) => ({
      ...prevState,
      delivery: {
        ...prevState.delivery,
        isEmpty: false,
      },
    }));

    const currentMethod = deliveryMethods.find((item) => {
      if (item.title === (event.target as HTMLInputElement).value) {
        return true;
      }
    });

    console.log(freeDelivery);

    if (sum < freeDelivery || !freeDelivery) {
      sum += currentMethod.value;
    }
    console.log(sum);
    handleData({
      ...orderData,
      totalPrice: sum,
      deliveryMethode: currentMethod.title,
      deliveryPrice:
        !freeDelivery || sum < freeDelivery ? currentMethod.value : 0,
    });
    dispatch({
      type: 'SET_TOTAL_SUM',
      payload: sum, // currentValue === 0 ? sum : cartTotalSum + currentValue,
    });
  };

  const { deliveryMethods } = data;

  const deliveryMethodsEl: JSX.Element =
    deliveryMethods && deliveryMethods.length > 0 ? (
      <FormControl style={{ width: '100%' }} component="fieldset">
        <RadioGroup
          aria-label="deliveryMethods"
          name="deliveryMethods"
          value={orderData.deliveryMethode}
          onChange={handleChange}
        >
          {deliveryMethods.map(
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
                <div
                  key={_id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  {isEnvelopeSize ? (
                    <FormControlLabel
                      value={title}
                      disabled={allowEnvelope ? false : true}
                      control={<Radio color="primary" />}
                      label={title}
                    />
                  ) : (
                    <FormControlLabel
                      value={title}
                      control={<Radio color="primary" />}
                      label={title}
                    />
                  )}{' '}
                  <p
                    className="text-right"
                    style={{ margin: '0', fontWeight: 'bold' }}
                  >
                    {value === 0
                      ? 'Zadarmo'
                      : freeDelivery !== null
                      ? getSum() < freeDelivery
                        ? `${formatPrice(value)} €`
                        : 'Zadarmo'
                      : `${formatPrice(value)} €`}
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
          <p>No delivery methodes configured in the shop.</p>
        </Col>
      </Row>
    );

  return (
    <Element name="deliveryMethod">
      <H4 className="mb-4">Spôsob dopravy</H4>
      {cartSummary.delivery.isEmpty && cartSummary.orderSent && (
        <ErrorText>{cartSummary.delivery.errorMessage}</ErrorText>
      )}
      {deliveryMethodsEl}
    </Element>
  );
};

export default Delivery;
