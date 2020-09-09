import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { withAuthSyncCustomer } from '../../app-data/lib/authCustomer';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import cookie from 'js-cookie';
import { P, H2, Wrapper } from './mojaZona';
import { Container } from 'reactstrap';
import Orders from '../../app-data/components/pages/myzone/orders';
import Points from '../../app-data/components/pages/myzone/points';
import Settings from '../../app-data/components/pages/myzone/setttings';
import { withSetCart } from '../../app-data/lib/state/Reducer';

const Home: () => JSX.Element = () => {
  const name = `${cookie.get('firstName')} ${cookie.get('lastName')}`;
  const id = cookie.get('userId');
  return (
    <>
      <Head>
        <title>Kúpele CKS moja zóna</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Wrapper>
          <Container>
            <H2 className="text-center">Vitajte vo Vašom konte {name} !</H2>
            <P className="text-center mb-4">
              Môžte si prezrieť Vaše objednávky, sledovať Váš vernostný program
              alebo nastaviť svoj účet.
            </P>
            <Orders id={id} />
            <Points id={id} />
            <Settings id={id} />
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withSetCart(withAuthSyncCustomer(Home));
