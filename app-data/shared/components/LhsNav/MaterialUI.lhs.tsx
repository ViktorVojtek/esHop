import React, { useContext } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ScatterPlotOutlinedIcon from '@material-ui/icons/ScatterPlotOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import MailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import { Context } from '../../../lib/state/Store';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const {
    state: { menuOpen },
    dispatch,
  } = useContext(Context);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    dispatch({ type: 'MENU_TOGGLE', payload: open });
  };

  const ListEl = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Typography>e-Commerce</Typography>
        </ListItem>
        <Link href="/admin/products">
          <ListItem button>
            <ListItemIcon>
              <ScatterPlotOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link href="/admin/orders">
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Link href="/admin/customers">
          <ListItem button>
            <ListItemIcon>
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </Link>
        <Link href="/admin/reviews">
          <ListItem button>
            <ListItemIcon>
              <RateReviewOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItem>
        </Link>
      </List>
      <List>
        <ListItem>
          <Typography>Settings</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link href="/admin/settings/category">
          <ListItem button>
            <ListItemIcon>
              <ClassOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
        </Link>
        <Link href="/admin/settings/subcategory">
          <ListItem button>
            <ListItemIcon>
              <ClassOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Subcategory" />
          </ListItem>
        </Link>
        <Link href="/admin/settings/currency">
          <ListItem button>
            <ListItemIcon>
              <EuroOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Currency" />
          </ListItem>
        </Link>
        <Link href="/admin/settings/delivery">
          <ListItem button>
            <ListItemIcon>
              <MailboxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Delivery" />
          </ListItem>
        </Link>
        <Link href="/admin/settings/discount">
          <ListItem button>
            <ListItemIcon>
              <TrendingDownOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Discount" />
          </ListItem>
        </Link>
        <Link href="/admin/settings/payment">
          <ListItem button>
            <ListItemIcon>
              <PaymentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Payment" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
      <ListEl />
    </Drawer>
  );
}
