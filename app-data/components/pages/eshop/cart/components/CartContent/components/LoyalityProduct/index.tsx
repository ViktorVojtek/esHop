import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { CloseCircle } from '@styled-icons/evaicons-solid';
import { Context } from '../../../../../../../../lib/state/Store';

type ILoyalityProduct = {
  loyalityProduct: {
    discount?: number;
    isDiscount?: boolean;
    title?: string;
  };
};

const Wrapper = styled.div`
  border: 1px solid #4caf50;
  background-color: #81c784;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H6 = styled.h6`
  color: white;
  margin: 0;
`;

const Span = styled.span`
  color: white;
  font-weight: bold;
`;

export const CloseCircleIcon = styled(CloseCircle)`
  width: 36px;
  color: white;
  cursor: pointer;
`;

const LoyalityProduct: FC<ILoyalityProduct> = (props: ILoyalityProduct) => {
  const { title, discount, isDiscount } = props.loyalityProduct;
  const { dispatch } = useContext(Context);

  function removeLoyalityProduct() {
    dispatch({
      type: 'ADD_LOYALITY_PRODUCT',
      payload: null,
    });
  }
  return (
    <Row>
      <Col md="6">
        <Wrapper>
          <H6>
            Vernostná zľava: <Span>{title}</Span>
          </H6>
          <CloseCircleIcon onClick={removeLoyalityProduct} />
        </Wrapper>
      </Col>
    </Row>
  );
};

export default LoyalityProduct;
