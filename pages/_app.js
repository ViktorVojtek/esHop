/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@brainhubeu/react-carousel/lib/style.css';
import Style from '../client/shared/styles/global.style';

import withApollo from '../client/app-data/graphql/withApollo';
import Store from '../client/app-data/StateManagement/Store';

const MyApp = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    Component, pageProps, pageTitle, apollo,
  } = props;

  return (
    <>
      <Head>
        <title>{pageTitle || 'Červený kláštor shop'}</title>
      </Head>
      <ApolloProvider client={apollo}>
        <Store>
          <Style />
          <Component {...pageProps} />
        </Store>
      </ApolloProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withApollo(MyApp);
