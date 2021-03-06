/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import Document, { Html, Head, Main, NextScript } from 'next/document';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@brainhubeu/react-carousel/lib/style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

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
        <title>
          {pageTitle || 'Eshop - KÚPELE ČERVENÝ KLÁŠTOR Smerdžonka'}
        </title>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Sme nový kúpeľný obchod s cieľom priniesť Vám našu nezabudnuteľnú atmosféru priamo domov prostredníctvom tradičných kúpeľných oblátok, kozmetiky, suvenírov, darčekových poukážok a veľa iných produktov."
        />
        <meta
          property="og:image"
          content="https://eshop.kupelecks.sk/images/slide1.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="2200" />
        <meta property="og:image:height" content="1238" />
        <meta property="og:image:alt" content="Wellness pobyt romantika" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={apollo}>
          <Store>
            <Style />
            {/*Production: 6LcS98QZAAAAAG6FfstRw_BF7BwFknxp-e-0Ra6-*/}
            {/*Local: 6LfgFeEZAAAAAD2fNYXGUjpI_Yu1c65XODYxgoyY*/}
            <GoogleReCaptchaProvider reCaptchaKey="6LcS98QZAAAAAG6FfstRw_BF7BwFknxp-e-0Ra6-">
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
