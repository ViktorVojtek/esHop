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
  const [mutate] = useMutation(UPDATE_ORDER_MUTATION, {
    refetchQueries: [{ query: ORDER_QUERY }],
    awaitRefetchQueries: true,
  });
  const [dropdownOpen, setOpenDropdown] = useState(false);
  const [action, setAction] = useState(0);

  const toggle = () => setOpenDropdown(!dropdownOpen);
  const [open, setOpen] = React.useState(false);

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

    console.log(value);

    /*if (value === '2') {
      console.log('fetchujem');
      await fetch('/invoice-omega', {
        body: JSON.stringify({
          orderId: order.orderId,
          email: order.email,
          totalPrice: order.totalPrice,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }*/
  };

  return (
    <>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="primary" caret>
          Zmeniť stav
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem value={0} color="primary" onClick={handleClickOpen}>
            Nová
          </DropdownItem>
          <DropdownItem value={1} color="warning" onClick={handleClickOpen}>
            Odoslaná
          </DropdownItem>
          <DropdownItem value={2} color="success" onClick={handleClickOpen}>
            Vybavená
          </DropdownItem>
          <DropdownItem value={3} color="danger" onClick={handleClickOpen}>
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
            Ste si istý, že chcete vykonať túto akciu ?
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
