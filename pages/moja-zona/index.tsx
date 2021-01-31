import React, { useEffect } from 'react';
import Head from 'next/head';
import { withAuthSyncCustomer } from '../../app-data/lib/authCustomer';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import cookie from 'js-cookie';
import {
  P,
  H2,
  Wrapper,
} from '../../app-data/components/pages/myzone/mojaZona';
import { Container } from 'reactstrap';
import Orders from '../../app-data/components/pages/myzone/orders';
import Points from '../../app-data/components/pages/myzone/points';
import SettingsPage from '../../app-data/components/pages/myzone/setttings';
import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import Settings from '@material-ui/icons/Settings';
import { useRouter } from 'next/router';

const toValues = {
  objednavky: 0,
  'vernostny-program': 1,
  nastavenia: 2,
};
const fromValues = {
  0: 'objednavky',
  1: 'vernostny-program',
  2: 'nastavenia',
};

const Home: () => JSX.Element = () => {
  const classes = useStyles1();
  const name = `${cookie.get('customerFName')} ${cookie.get('customerLName')}`;
  const id = cookie.get('customerId');
  const email = cookie.get('customerEmail');
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    if (tab === undefined) {
      return;
    }
    setValue(toValues[tab as string]);
  }, [router]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    router.push({
      query: { tab: `${fromValues[newValue]}` },
    });
  };
  return (
    <>
      <Head>
        <title>Kúpele CKS moja zóna</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Wrapper>
          <Container>
            <H2 className="text-center">Vitajte vo Vašom konte !</H2>
            <P className="text-center mb-4">
              Môžete si prezrieť Vaše objednávky, sledovať Váš vernostný program
              alebo nastaviť svoj účet.
            </P>
            <Paper square className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                className={classes.tab}
              >
                <Tab icon={<ShoppingCart />} label="Objednávky" />
                <Tab icon={<CardGiftcard />} label="Vernostný program" />
                <Tab icon={<Settings />} label="Nastavenia" />
              </Tabs>
            </Paper>
            {value === 0 && <Orders email={email} id={id} />}
            {value === 1 && <Points id={id} />}
            {value === 2 && <SettingsPage id={id} />}
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

const useStyles1 = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: '0 auto',
    marginTop: '32px',
  },
  tab: {
    '& button': {
      outline: 'none',
    },
    '& span': {
      textTransform: 'capitalize',
    },
  },
});

export default withAuthSyncCustomer(Home);
