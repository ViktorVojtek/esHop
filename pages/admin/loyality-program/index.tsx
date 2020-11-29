import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import LoyalityProgramContent from '../../../app-data/components/pages/admin/loyality-program';
import { PageProps } from '../Types/Page.types';

const LoyalityProgram: (props: PageProps) => JSX.Element = ({ role }) => (
  <>
    <Head>
      <title>esHop App | Vernostný program</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Vernostný program" role={role}>
      <LoyalityProgramContent />
    </Layout>
  </>
);

export default withAuthSync(LoyalityProgram);
