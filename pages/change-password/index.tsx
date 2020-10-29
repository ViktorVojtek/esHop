import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { withSetCart } from '../../app-data/lib/state/Reducer';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { P, H2 } from '../../app-data/components/pages/myzone/mojaZona';
import { Container, FormGroup, Input, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, Button } from '../../app-data/shared/styles/components/Auth';
import ErrorMessage from '../../app-data/shared/components/ErrorMessage';
import SuccessMessage from '../../app-data/shared/components/SucessMessage';
import { red } from '@material-ui/core/colors';
import { Danger } from '../../app-data/shared/components/LoginRegisterModal/styles';

const Wrapper = styled.div`
  min-height: calc(100vh - 349px);
  margin-top: 140px;
`;

const FormHolder = styled.div`
  max-width: 400px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
`;

const messages = [
  'Účet neexistuje!',
  'Účet už bol verifikovaný!',
  'Verifikačný email bol odoslaný!',
];

const ChangePassword: () => JSX.Element = () => {
  const router = useRouter();
  const { query } = router;
  const [messageId, setMessageId] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const passwordEl = useRef(null);
  const [isMatchPass, setIsMatchPass] = useState(true);

  let token = query.token;

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const email = form.email.value;
      const response = await fetch('/resend', {
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (response.status === 200) {
        setMessageId(2);
        setIsError(false);
        setisSuccess(true);
      }
      if (response.status === 404) {
        setMessageId(0);
        setIsError(true);
        setisSuccess(false);
      }
      if (response.status === 409) {
        setMessageId(1);
        setIsError(true);
        setisSuccess(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const matchPassoword = (e) => {
    e.target.value === passwordEl.current.value
      ? setIsMatchPass(true)
      : setIsMatchPass(false);
  };
  return (
    <>
      <Head>
        <title>Kúpele CKS zmena hesla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Wrapper>
          <Container>
            <H2 className="text-center">Zmena hesla</H2>
            <P className="text-center">
              Pre zmenu hesla do Vášho účtu, je použiť odkaz, ktorý bol odoslaný
              na Vašu emailovú adresu. V prípade, že ste email neobdržali,
              kliknite v zóne <strong>Príhlasenie</strong> na{' '}
              <strong>Zabudnuté heslo</strong>
            </P>
            <p>{token}</p>
            <FormHolder>
              <Form onSubmit={handleSubmitForm} className="mb-4">
                <FormGroup className="mb-2">
                  <Label htmlFor="password">Heslo</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    innerRef={passwordEl}
                    required
                    autoComplete="new-password"
                  />
                </FormGroup>
                <FormGroup className="mb-2">
                  <Label htmlFor="retypePassword">Zopakovať heslo</Label>
                  <Input
                    id="retypePassword"
                    name="retypePassword"
                    type="password"
                    onChange={matchPassoword}
                    required
                  />
                </FormGroup>
                {!isMatchPass && <Danger>Hesla sa nezhodujú</Danger>}
                <Button type="submit">Odoslať</Button>
              </Form>

              <ErrorMessage message={messages[messageId]} open={isError} />
              <SuccessMessage message={messages[messageId]} open={isSuccess} />
            </FormHolder>
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withSetCart(ChangePassword);
