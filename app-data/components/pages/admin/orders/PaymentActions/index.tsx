import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PAYMENT_STATUS_MUTATION } from '../../../../../graphql/mutation';
import { ORDER_QUERY } from '../../../../../graphql/query';
import { useSnackbar } from 'notistack';
import { translatePaymentStatus } from '../../../../../shared/helpers/formatters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.error.main,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
  })
);

const PaymentActions = ({ id }: { id: string }) => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [mutate] = useMutation(UPDATE_PAYMENT_STATUS_MUTATION, {
    refetchQueries: [{ query: ORDER_QUERY }],
    awaitRefetchQueries: true,
  });

  const [dropdownOpen, setOpenDropdown] = useState(false);
  const [payment, setPayment] = useState(0);

  const toggle = () => setOpenDropdown(!dropdownOpen);
  const [open, setOpen] = useState(false);

  // Payment status

  const handleClickOpen = (event: any) => {
    const { value } = event.currentTarget;
    setOpen(true);
    setPayment(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick: (value: any) => Promise<void> = async (value) => {
    const result = await mutate({
      variables: { _id: id, paymentStatus: +value },
    });

    const order = result.data.updatePaymentStatus;

    enqueueSnackbar(
      `Nový status platby: ${translatePaymentStatus(order.paymentStatus)}`,
      {
        variant: 'success',
      }
    );
  };

  return (
    <>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="primary" caret>
          Stav platby
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem value={0} onClick={handleClickOpen}>
            Neuhradená
          </DropdownItem>
          <DropdownItem value={1} onClick={handleClickOpen}>
            Uhradená
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Potvrdenie akcie'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ste si istý, že chcete zmeniť stav platby ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            className={classes.button}
          >
            Zrušiť
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleOnClick(payment);
            }}
            variant="contained"
            color="primary"
            autoFocus
          >
            Vykonať
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentActions;
