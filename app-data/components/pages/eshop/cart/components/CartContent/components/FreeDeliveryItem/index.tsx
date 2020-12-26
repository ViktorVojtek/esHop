import React from 'react';
import { Col } from 'reactstrap';
import styled from 'styled-components';
import { colors } from '../../../../../../../../shared/design';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';
import { ShippingFast } from '@styled-icons/fa-solid';

type FreeDeliveryProps = {
  value: number;
};

const Tab = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${colors.primary};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;

const Icon = styled(ShippingFast)`
  color: white;
  width: 32px;
  margin-right: 16px;
`;

const P = styled.p`
  text-transform: uppercase;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const FreeDeliveryItem = (props: FreeDeliveryProps): JSX.Element => {
  const { value } = props;

  return (
    <Col md={6} className="mb-4">
      <Tab>
        <Icon />
        <P>{`Doprava zadarmo nad ${formatPrice(value)} € !`}</P>
      </Tab>
    </Col>
  );
};

export default FreeDeliveryItem;
