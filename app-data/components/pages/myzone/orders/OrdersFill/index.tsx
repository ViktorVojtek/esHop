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
  return (
    order && (
      <tbody>
        <>
          <tr>
            <th>{orderId}</th>
            <th>{created_at}</th>
            <th>{statusBadge(status)}</th>
            <th>{deliveryMethode}</th>
            <th>{paymentMethode}</th>
            <th>{`${formatPrice(totalPrice)} €`}</th>
            <th>
              <Button color="primary" onClick={toggle}>
                Zobraziť
              </Button>
            </th>
          </tr>
        </>
        <Modal className="full-table" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Súhrn produktov</ModalHeader>
          <ModalBody>
            <Table striped responsive>
              <thead>
                <tr>
                  <th>Názov</th>
                  <th>Variant</th>
                  <th>KS</th>
                  <th>Cena</th>
                  <th>Cena Spolu</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <th>{product.title}</th>
                    <th>{product.variant.title}</th>
                    <th>{product.variant.count}</th>
                    <th>{`${product.variant.price.value} €`}</th>
                    <th>{`${
                      product.variant.price.value * product.variant.count
                    } €`}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Zavrieť
            </Button>
          </ModalFooter>
        </Modal>
      </tbody>
    )
  );
};

function statusBadge(value: number) {
  return (
    <Badge color={translateStatusColor(value)}>{translateStatus(value)}</Badge>
  );
}

export default OrdersFill;
