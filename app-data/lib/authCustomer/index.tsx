/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

import { ILogin } from './TS/auth.interface';

export const login: (data: ILogin) => void = ({
  _id,
  firstName,
  lastName,
  token,
}) => {
  cookie.set('token', token, { expires: 0.33 }); // 1 stands for a day (24h), 0.33 stands aprox. for 8h
  cookie.set('userId', _id);
  cookie.set('firstName', firstName);
  cookie.set('lastName', lastName);

  Router.push('/moja-zona');
};

export const auth: (ctx: any) => string = (ctx) => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/moja-zona/prihlasenie' });
      ctx.res.end();
    } else {
      Router.push('/moja-zona/prihlasenie');
    }
  }

  return token;
};

export const logout: () => void = () => {
  cookie.remove('token');
  cookie.remove('userId');
  cookie.remove('firstName');
  cookie.remove('lastName');
  cookie.remove('userEmail');

  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);
  Router.push('/moja-zona/prihlasenie');
};

export const withAuthSync = (WrappedComponent: any) => {
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
