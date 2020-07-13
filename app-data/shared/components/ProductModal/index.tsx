import React, { FC, useContext, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
// import PropTypes from 'prop-types';

import { IModal } from './TS/Modal.interface';

import { Context } from '../../../lib/state/Store';

const ProductModalComponent: FC<IModal> = ({ children, message, title }) => {
  const { state, dispatch } = useContext(Context);
  const { modal } = state;

  const toggle = () => {
    dispatch({ type: 'SET_PRODUCT_MODAL', payload: false });
  };

  console.log(modal);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>{children}</ModalFooter>
    </Modal>
  );
};

export default ProductModalComponent;
