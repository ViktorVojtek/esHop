import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { CloseCircle } from '@styled-icons/evaicons-solid';
import { Context } from '../../../../../../../../lib/state/Store';
import { colors } from '../../../../../../../../shared/design';

export type ILoyalityProduct = {
  loyalityProduct: {
    discount?: number;
    isDiscount?: boolean;
    title?: string;
  };
};

const Wrapper = styled.div`
  border: 1px solid #4caf50;
  background-color: ${colors.success};
  border-radius: 4px;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${colors.success};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
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
  width: 28px;
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
    <Wrapper>
      <H6>
        Vernostná zľava: <Span>{title}</Span>
      </H6>
      <CloseCircleIcon onClick={removeLoyalityProduct} />
    </Wrapper>
  );
};

export default LoyalityProduct;
