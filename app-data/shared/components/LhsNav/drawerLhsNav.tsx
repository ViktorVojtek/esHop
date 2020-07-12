import React, { FunctionComponent, ComponentClass } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
// Icons
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import ScatterPlotOutlinedIcon from '@material-ui/icons/ScatterPlotOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import MailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

const menuItems1 = [
  {
    href: '/admin/products',
    title: 'Products',
    iconComponent: ScatterPlotOutlinedIcon,
  },
  {
    href: '/admin/services',
    title: 'Services',
    iconComponent: SettingsApplicationsOutlinedIcon,
  },
  {
    href: '/admin/orders',
    title: 'Orders',
    iconComponent: FormatListNumberedOutlinedIcon,
  },
  {
    href: '/admin/customers',
    title: 'Customers',
    iconComponent: GroupOutlinedIcon,
  },
  {
    href: '/admin/reviews',
    title: 'Reviews',
    iconComponent: RateReviewOutlinedIcon,
  },
];

const menuItems2 = [
  {
    href: '/admin/settings/category',
    title: 'Category',
    iconComponent: ClassOutlinedIcon,
  },
  {
    href: '/admin/settings/subcategory',
    title: 'Subcategory',
    iconComponent: ClassOutlinedIcon,
  },
  {
    href: '/admin/accomodation',
    title: 'Accomodation',
    iconComponent: ScatterPlotOutlinedIcon,
  },
  {
    href: '/admin/settings/currency',
    title: 'Currency',
    iconComponent: EuroOutlinedIcon,
  },
  {
    href: '/admin/settings/delivery',
    title: 'Delivery',
    iconComponent: MailboxOutlinedIcon,
  },
  {
    href: '/admin/settings/discount',
    title: 'Discount',
    iconComponent: TrendingDownOutlinedIcon,
  },
  {
    href: '/admin/settings/payment',
    title: 'Payment',
    iconComponent: PaymentOutlinedIcon,
  },
];

export default () => {
  const classes = useStyles();
  const listMenuItems1 = getListMenuItems(menuItems1);
  const listMenuItems2 = getListMenuItems(menuItems2);

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <Typography>e-Commerce</Typography>
        </ListItem>
        {listMenuItems1}
      </List>
      <List>
        <ListItem>
          <Typography>Settings</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>{listMenuItems2}</List>
    </>
  );
};

function getListMenuItems(
  data: {
    href: string;
    title: string;
    iconComponent: string | FunctionComponent<{}> | ComponentClass<{}, any>;
  }[]
): JSX.Element[] {
  return data.map((item, i) => (
    <Link href={item.href} key={i}>
      <ListItem button>
        <ListItemIcon>
          {React.createElement(item.iconComponent, {})}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    </Link>
  ));
}
