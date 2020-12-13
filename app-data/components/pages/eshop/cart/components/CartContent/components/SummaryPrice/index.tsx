import React, { useContext } from 'react';
import { Context } from '../../../../../../../../lib/state/Store';
import styled from 'styled-components';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';
import { colors } from '../../../../../../../../shared/design';
import { Col, Row } from 'reactstrap';

const Wrapper = styled.div`
  margin-top: 36px;
  border-top: 3px solid ${colors.primary};
  width: 100%;
  padding: 16px;
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const Holder = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  max-width: 300px;
  margin-left: auto;
`;

const P = styled.p`
  font-size: 1rem;
  text-align: right;
  margin-bottom: 0.25rem;
`;

const TotalSum = styled.p`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 20px;
  color: ${colors.primary};
  margin-bottom: 0.25rem;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const SummaryPrice = (): JSX.Element => {
  const {
    state: { cartTotalSum },
  } = useContext(Context);
  return (
    <Wrapper>
      <Row>
        <Col md={12} lg={6}>
          <p className="text-left mt-2 mb-0 w-100">* Povinné pole</p>
        </Col>
        <Col md={12} lg={6}>
          <Holder>
            <P style={{ fontWeight: 'bold' }}>K úhrade:</P>
            <TotalSum>{formatPrice(cartTotalSum)} €</TotalSum>
          </Holder>
          <Holder>
            {' '}
            <P>Celkom bez DPH:</P>
            <P>{formatPrice(cartTotalSum / 1.2)} €</P>
          </Holder>
          <Holder>
            <P>DPH:</P>
            <P>{formatPrice(cartTotalSum - cartTotalSum / 1.2)} €</P>
          </Holder>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default SummaryPrice;
