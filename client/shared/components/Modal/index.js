import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

import { Context } from '../../../app-data/StateManagement/Store';

const ModalComponent = ({ children }) => {
  const [{ error, modal }, dispatch] = useContext(Context);

  const toggle = () => {
    dispatch({ type: 'SET_MODAL', payload: !modal });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal</ModalHeader>
      <ModalBody>
        {error}
        {children}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ModalComponent.defaultProps = {
  children: ''
};
ModalComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ])
};

export default ModalComponent;
