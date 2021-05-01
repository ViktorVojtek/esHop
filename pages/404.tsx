import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../app-data/lib/state/Reducer';
import { MessageRoundedError } from '@styled-icons/boxicons-regular';
import styled from 'styled-components';
import { Button } from '../app-data/shared/design';

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 562px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Icon = styled(MessageRoundedError)`
  color: #00aeef;
  width: 160px;
  margin: 0 auto;
  display: block;
`;

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>Kúpele CKS stránka sa nenašla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Wrapper>
          <Icon />
          <h4 className="text-center font-weight-bold mt-4 mb-4">
            Ľutujeme, stránka sa nenašla!
          </h4>
          <Link href="/eshop">
            <Button>Nakupovať</Button>
          </Link>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withSetCart(Custom404);
