import Head from 'next/head';
import nextCookie from 'next-cookies';
import { withAuthSync } from '../../client/app-data/lib/auth';
import Layout from '../../client/shared/components/Layout';
import NavHeader from '../../client/shared/components/NavHeader';

const Home = () => (
  <Layout>
    <Head>
      <title>esHop App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavHeader />
    <main>
      <p>Admin.</p>
    </main>
  </Layout>
);

export default withAuthSync(Home);
