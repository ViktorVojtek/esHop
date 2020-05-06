import React, { FC, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

import { IModal } from './TS/Modal.interface';

import { Context } from '../../../lib/state/Store';

const ModalComponent: FC<IModal> = ({ children }) => {
  const { state, dispatch } = useContext(Context);
  const { modal } = state;

  const toggle = () => {
    dispatch({ type: 'SET_MODAL', payload: !modal });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ModalComponent.defaultProps = {
  children: '',
};
ModalComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalComponent;
