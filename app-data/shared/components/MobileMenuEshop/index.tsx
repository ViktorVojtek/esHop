import React, { FC, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Link from 'next/link';
import { Nav, NavItem, NavbarBrand } from 'reactstrap';
import { ILinkItem } from '../Navigation/Site/TS/Navigation.interface';
import { MenuIcon, Wrapper, Logo, NavLink } from './styles';

const useStyles = makeStyles({
  list: {
    width: '85vw',
  },
  fullList: {
    width: 'auto',
  },
});

type FWRCBrand = {
  href: string;
  children: ReactNode;
};

const CustomNavbarBrand = forwardRef(({ href, children }: FWRCBrand, ref) => (
  <NavbarBrand href={href}>{children}</NavbarBrand>
));

const LinkItem: FC<ILinkItem> = ({ href, title }) => (
  <NavItem>
    <Link href={href}>
      <NavLink className="text-uppercase letter-spacing-1">{title}</NavLink>
    </Link>
  </NavItem>
);

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Wrapper className={clsx(classes.list)}>
      <>
        <Link href="/">
          <CustomNavbarBrand href="/">
            <Logo src="/images/logo.png" alt="Červený kláštor" />
          </CustomNavbarBrand>
        </Link>
        <Nav navbar>
          <LinkItem href="/" title="Domov" />
          <LinkItem href="/eshop" title="Obchod" />
          <LinkItem href="/darcekove-poukazky" title="Darčekové poukážky" />
          <LinkItem href="/kontakt" title="Kontakt" />
        </Nav>
      </>
    </Wrapper>
  );

  return (
    <div>
      <MenuIcon onClick={toggleDrawer('left', true)} />
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
