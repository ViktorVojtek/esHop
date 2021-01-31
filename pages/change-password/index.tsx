import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { withSetCart } from '../../app-data/lib/state/Reducer';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { P, H2 } from '../../app-data/components/pages/myzone/mojaZona';
import { Container, FormGroup, Input, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  Form,
  Button,
  ButtonLink,
} from '../../app-data/shared/styles/components/Auth';
import { Danger } from '../../app-data/shared/components/LoginRegisterModal/styles';
import { useMutation } from 'react-apollo';
import { CHANGE_CUSTOMER_PASSWORD_MUTATION } from '../../app-data/graphql/mutation';
import Link from 'next/link';
import ErrorMessage from '../../app-data/shared/components/ErrorMessage';

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 693px);
`;

const FormHolder = styled.div`
  max-width: 400px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
`;

const ChangePassword: () => JSX.Element = () => {
  const router = useRouter();
  const { query } = router;
  const passwordEl = useRef(null);
  const submitEl = useRef(null);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, isError] = useState(false);

  const [changeCustomerPassword] = useMutation(
    CHANGE_CUSTOMER_PASSWORD_MUTATION
  );

  let token = query.token;

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const password = form.password.value;
      submitEl.current.setAttribute('disabled', 'disabled');
      const response = await changeCustomerPassword({
        variables: { token, password },
      });
      setSuccess(true);
    } catch (err) {
      isError(true);
      submitEl.current.removeAttribute('disabled');
    }
  };

  const matchPassoword = (e) => {
    if (e.target.value === passwordEl.current.value) {
      setIsMatchPass(true);
      submitEl.current.removeAttribute('disabled');
    } else {
      setIsMatchPass(false);
      submitEl.current.setAttribute('disabled', 'disabled');
    }
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
            {!success ? (
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
                  <ErrorMessage message="Neplatný token" open={error} />
                  <Button type="submit" ref={submitEl}>
                    Odoslať
                  </Button>
                </Form>
              </FormHolder>
            ) : (
              <div className="text-center">
                <H2>Zmena hesla prebehla úspešne</H2>
                <Link href="moja-zona/prihlasenie">
                  <ButtonLink>Prihlásenie</ButtonLink>
                </Link>
              </div>
            )}
          </Container>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withSetCart(ChangePassword);
