import React, { FC, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Container,
  Button,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LHS from '../LhsNav/MaterialUI.lhs';
import { logout } from '../../../lib/auth';
import { Context } from '../../../lib/state/Store';

import { ILayout } from './TS/layout.interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    wrapper: {
      backgroundColor: '#f5f5f5',
    },
    containerWrapper: {
      backgroundColor: '#f5f5f5',
      width: '100%',
    },
    container: {
      marginTop: theme.spacing(8.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  })
);

const Layout: FC<ILayout> = ({ children, pageTitle }) => {
  const classes = useStyles();
  const { dispatch } = useContext(Context);

  const handleOpenMenu = () => {
    dispatch({ type: 'MENU_TOGGLE', payload: true });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleOpenMenu}
            >
              <SvgIcon>
                <MenuIcon />
              </SvgIcon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {pageTitle || ''}
            </Typography>
            <Button color="inherit" onClick={logout}>
              <Typography variant="button">
                Logout{' '}
                <SvgIcon fontSize="small">
                  <ExitToAppIcon />
                </SvgIcon>
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <LHS />
      <Container maxWidth="md" className={classes.container}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
