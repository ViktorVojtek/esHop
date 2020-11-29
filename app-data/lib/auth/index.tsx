/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

import { ILogin } from './TS/auth.interface';

export type LoginType = ILogin;

export const login: (data: LoginType) => void = ({
  _id,
  firstName,
  lastName,
  role,
  token,
}) => {
  cookie.set('token', token, { expires: 0.33 }); // 1 stands for a day (24h), 0.33 stands aprox. for 8h
  cookie.set('userId', _id);
  cookie.set('firstName', firstName);
  cookie.set('lastName', lastName);
  cookie.set('role', `${role}`);

  Router.push('/admin');
};

export const auth: (ctx: any) => { token: string; role: number } = (ctx) => {
  const { token, role } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/auth/login' });
      ctx.res.end();
    } else {
      Router.push('/auth/login');
    }
  }

  return { token, role: +role };
};

export const logout: () => void = () => {
  cookie.remove('token');
  cookie.remove('userId');
  cookie.remove('firstName');
  cookie.remove('lastName');
  cookie.remove('userEmail');
  cookie.remove('role');

  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);
  Router.push('/auth/login');
};

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/auth/login');
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
    const { token, role } = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token, role };
  };

  return Wrapper;
};
