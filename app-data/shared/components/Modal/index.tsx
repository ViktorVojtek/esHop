import React, { FC, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import PropTypes from 'prop-types';

import { IModal } from './TS/Modal.interface';

import { Context } from '../../../lib/state/Store';

const ModalComponent: FC<IModal> = ({ children, title, fn }) => {
  const { state, dispatch } = useContext(Context);
  const { modal } = state;

  const toggle = () => {
    dispatch({ type: 'SET_MODAL', payload: !modal });
  };
  const doAgree = () => {
    if (typeof fn === 'function') {
      fn();
    } else {
      toggle();
    }
  };

  return (
    <Dialog
      open={modal}
      onClose={toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title || 'Modal'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="primary">
          Cancel
        </Button>
        <Button onClick={doAgree} color="danger" autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/* <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> */

/* ModalComponent.defaultProps = {
  children: '',
};
ModalComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
}; */

export default ModalComponent;
