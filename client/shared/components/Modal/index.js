import React, { useContext } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import { Context } from '../../../app-data/StateManagement/Store';

const ModalComponent = () => {
  const [{ error, modal }, dispatch] = useContext(Context);

  const toggle = () => {
    dispatch({ type: 'SET_MODAL', payload: !modal });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal</ModalHeader>
      <ModalBody>
        {error}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
