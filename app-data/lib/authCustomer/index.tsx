/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

import { ILogin } from './TS/auth.interface';

export const login: (data: ILogin) => void = ({
  _id,
  firstName,
  email,
  lastName,
  token,
}) => {
  cookie.set('customerToken', token, { expires: 0.33 }); // 1 stands for a day (24h), 0.33 stands aprox. for 8h
  cookie.set('customerId', _id);
  cookie.set('customerFName', firstName);
  cookie.set('customerLName', lastName);
  cookie.set('customerEmail', email);
  let isMyZone = Router.pathname.includes('moja-zona');
  isMyZone ? Router.push('/moja-zona') : Router.reload();
};

export const auth: (ctx: any) => string = (ctx) => {
  const { customerToken } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!customerToken) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/moja-zona/prihlasenie' });
      ctx.res.end();
    } else {
      Router.push('/moja-zona/prihlasenie');
    }
  }

  return customerToken;
};

export const logout: () => void = () => {
  cookie.remove('customerToken');
  cookie.remove('customerId');
  cookie.remove('customerFName');
  cookie.remove('customerLName');
  cookie.remove('customerEmail');
  let isMyZone = Router.pathname.includes('moja-zona');

  // remove loyality product

  window.localStorage.removeItem('loyalityProduct');

  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);

  isMyZone ? Router.push('/moja-zona/prihlasenie') : Router.reload();
};

export const withAuthSyncCustomer = (WrappedComponent: any) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/moja-zona/prihlasenie');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
