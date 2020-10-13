import React, { FC, useState } from 'react';

import {
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  ModalFooter,
} from 'reactstrap';
import {
  formatPrice,
  translateStatus,
  translateStatusColor,
} from '../../../../../shared/helpers/formatters';

const OrdersFill = ({ order }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const {
    orderId,
    createdAt,
    status,
    deliveryMethode,
    paymentMethode,
    totalPrice,
    products,
    created_at,
  } = order;
  const date = new Date(created_at.slice(0, 10) * 1000);
  return (
    order && (
        <>
          <tr>
            <th>{orderId}</th>
            <th>{`${date.toLocaleDateString('sk-SK')}, ${date.toLocaleTimeString('sk-SK')}`}</th>
            <th>{statusBadge(status)}</th>
            <th>{deliveryMethode}</th>
            <th>{paymentMethode}</th>
            <th>{`${formatPrice(totalPrice)} €`}</th>
          </tr>
        </>
    )
  );
};

function statusBadge(value: number) {
  return (
    <Badge color={translateStatusColor(value)}>{translateStatus(value)}</Badge>
  );
}

export default OrdersFill;
