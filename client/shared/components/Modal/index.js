import React, { useContext } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import { Context } from '../../../app-data/StateManagement/Store';

// TODO: Finish modal component
const ModalComponent = () => {
  const [{ modal }, dispatch] = useContext(Context);

  const toggle = () => {
    dispatch({ type: 'SET_MODAL', payload: !modal });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Do Something</Button>
        {' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
