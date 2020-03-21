import Head from 'next/head';
import nextCookie from 'next-cookies';
import { withAuthSync } from '../../client/app-data/lib/auth';
import Layout from '../../client/shared/components/Layout';
import NavHeader from '../../client/shared/components/NavHeader';
import LhsNav from '../../client/shared/components/LhsNav';
import { Container } from '../../client/shared/styles/global.style';
import { WrapperFlex } from './styles';

const Home = () => (
  <Layout>
    <Head>
      <title>esHop App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavHeader />
    <WrapperFlex>
      <LhsNav />
      <div>
        <p>Admin content.</p>
      </div>
    </WrapperFlex>
  </Layout>
);

export default withAuthSync(Home);
