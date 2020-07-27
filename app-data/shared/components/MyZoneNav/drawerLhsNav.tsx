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
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);

const menuItems1 = [
  {
    href: '/moja-zona/objednavky',
    title: 'Moje objednávky',
    iconComponent: ListIcon,
  },
  {
    href: '/moja-zona/vernostny-program',
    title: 'Vernostný program',
    iconComponent: EuroOutlinedIcon,
  },
  {
    href: '/moja-zona/nastavenia',
    title: 'Nastavenia',
    iconComponent: SettingsApplicationsOutlinedIcon,
  },
];

export default () => {
  const classes = useStyles();
  const listMenuItems1 = getListMenuItems(menuItems1);

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <Typography>Moja zóna</Typography>
        </ListItem>
        {listMenuItems1}
      </List>
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
