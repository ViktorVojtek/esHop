import React, { useContext, useState } from 'react';
import { Context } from '../../../lib/state/Store';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { logout } from '../../../lib/authCustomer';
import LoginRegisterModal from '../LoginRegisterModal';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import styled from 'styled-components';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import Settings from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  list: {
    width: 250,
    '& .MuiListItemIcon-root': {
      minWidth: '36px',
    },
  },
});

export const Login = styled(AccountCircleIcon)`
  color: red;
  width: 36px !important;
  height: 36px !important;
  margin-left: 1rem;
  cursor: pointer;
  @media (max-width: 576px) {
    width: 26px !important;
    height: 26px !important;
  }
`;

const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: red;
  width: 36px !important;
  height: 36px !important;
  margin-left: 12px;
  transition: all 0.3s ease-out !important;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const StyledCloseIcon = styled(CloseIcon)`
  color: rgba(0, 0, 0, 0.54);
  margin: 8px;
  margin-left: auto;
`;
const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
  color: rgba(0, 0, 0, 0.54);
`;
const StyledCardGiftcard = styled(CardGiftcard)`
  color: rgba(0, 0, 0, 0.54);
`;
const StyledSettings = styled(Settings)`
  color: rgba(0, 0, 0, 0.54);
`;
const StyledExitToAppIcon = styled(ExitToAppIcon)`
  color: rgba(0, 0, 0, 0.54);
`;

const CustomerMenu = () => {
  const { state } = useContext(Context);
  const classes = useStyles();
  const [loginModal, setLoginModal] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { customer } = state;
  return (
    <>
      <div>
        {customer.token ? (
          <>
            <StyledAccountCircleIcon onClick={handleDrawerOpen} />
            <Drawer
              disableScrollLock
              anchor="right"
              open={open}
              onClose={handleDrawerClose}
            >
              <StyledCloseIcon onClick={handleDrawerClose} />
              <div role="presentation" className={classes.list}>
                <List>
                  <Link href="/moja-zona?tab=objednavky">
                    <ListItem button onClick={handleDrawerClose}>
                      <ListItemIcon>
                        <StyledShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Objednávky" />
                    </ListItem>
                  </Link>
                  <Link href="/moja-zona?tab=vernostny-program">
                    <ListItem button onClick={handleDrawerClose}>
                      <ListItemIcon>
                        <StyledCardGiftcard />
                      </ListItemIcon>
                      <ListItemText primary="Vernostný program" />
                    </ListItem>
                  </Link>
                  <Link href="/moja-zona?tab=nastavenia">
                    <ListItem button onClick={handleDrawerClose}>
                      <ListItemIcon>
                        <StyledSettings />
                      </ListItemIcon>
                      <ListItemText primary="Nastavenia" />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={logout}>
                    <ListItemIcon>
                      <StyledExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Odhlásenie" />
                  </ListItem>
                </List>
              </div>
            </Drawer>
          </>
        ) : (
          <Login onClick={() => setLoginModal(true)} />
        )}
      </div>

      <LoginRegisterModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
      />
    </>
  );
};

export default CustomerMenu;
