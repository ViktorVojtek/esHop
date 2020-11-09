/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@brainhubeu/react-carousel/lib/style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Style from '../app-data/shared/styles/global.style';
// Material UI support
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../app-data/lib/util/mui/theme';

import withApollo from '../app-data/graphql/withApollo';
import Store from '../app-data/lib/state/Store';
import { SnackbarProvider } from 'notistack';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const MyApp = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    Component,
    pageProps,
    pageTitle,
    apollo,
  } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle || 'Červený kláštor shop'}</title>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={apollo}>
          <Store>
            <Style />
            <GoogleReCaptchaProvider reCaptchaKey="6LfgFeEZAAAAAD2fNYXGUjpI_Yu1c65XODYxgoyY">
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Component {...pageProps} />
              </SnackbarProvider>
            </GoogleReCaptchaProvider>
          </Store>
        </ApolloProvider>
      </ThemeProvider>
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

export default withApollo(MyApp as any);
