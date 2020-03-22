/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({
  _id, firstName, lastName, token,
}) => {
  cookie.set('token', token, { expires: 0.33 }); // 1 stands for a day (24h), 0.33 stands aprox. for 8h
  cookie.set('userId', _id);
  cookie.set('firstName', firstName);
  cookie.set('lastName', lastName);

  Router.push('/admin');
};

export const auth = (ctx) => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/auth/login' });
      ctx.res.end();
    } else {
      Router.push('/auth/login');
    }
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  cookie.remove('userId');
  cookie.remove('firstName');
  cookie.remove('lastName');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/auth/login');
};

export const withAuthSync = (WrappedComponent) => {
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
    const token = auth(ctx);

    const componentProps = WrappedComponent.getInitialProps
      && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
