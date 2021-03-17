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
import { UPDATE_ORDER_MUTATION } from '../../../../../graphql/mutation';
import { ORDER_QUERY } from '../../../../../graphql/query';
import { useSnackbar } from 'notistack';
import { translateStatus } from '../../../../../shared/helpers/formatters';

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

const Actions = ({ id }: { id: string }) => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [mutate] = useMutation(UPDATE_ORDER_MUTATION, {
    refetchQueries: [{ query: ORDER_QUERY }],
    awaitRefetchQueries: true,
  });
  const [dropdownOpen, setOpenDropdown] = useState(false);
  const [action, setAction] = useState(0);

  const toggle = () => setOpenDropdown(!dropdownOpen);
  const [open, setOpen] = useState(false);

  // Order status
  const handleClickOpen = (event: any) => {
    const { value } = event.currentTarget;
    setOpen(true);
    setAction(value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOnClick: (value: any) => Promise<void> = async (value) => {
    const result = await mutate({ variables: { _id: id, status: +value } });

    const order = result.data.updateOrder;

    enqueueSnackbar(
      `Nový status objednávky: ${translateStatus(order.status)}`,
      {
        variant: 'success',
      }
    );
    if (value === '2') {
      await fetch('/invoice-omega', {
        body: JSON.stringify({
          invoiceId: order.invoiceId,
          orderId: order.orderId,
          email: order.email,
          totalPrice: order.totalPrice,
          firstName: order.firstName,
          lastName: order.lastName,
          paymentMethode: order.paymentMethode,
          deliveryMethode: order.deliveryMethode,
          deliveryPrice: order.deliveryPrice,
          phone: order.phone,
          address: order.address,
          postalCode: order.postalCode,
          city: order.city,
          optionalAddress: order.optionalAddress,
          optionalCity: order.optionalCity,
          optionalPostalCode: order.optionalPostalCode,
          companyDTAXNum: order.companyDTAXNum,
          products: order.products,
          companyDVATNum: order.companyDVATNum,
          companyName: order.companyName,
          companyVatNum: order.companyVatNum,
          paymentPrice: order.paymentPrice,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }
  };

  return (
    <>
      <ButtonDropdown className="mb-2" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="primary" caret>
          Stav objednávky
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem value={0} onClick={handleClickOpen}>
            Nová
          </DropdownItem>
          <DropdownItem value={1} onClick={handleClickOpen}>
            Odoslaná
          </DropdownItem>
          <DropdownItem value={2} onClick={handleClickOpen}>
            Vybavená
          </DropdownItem>
          <DropdownItem value={3} onClick={handleClickOpen}>
            Zrušená
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
            Ste si istý, že chcete zmeniť stav objednávky ?
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
              handleOnClick(action);
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

export default Actions;
