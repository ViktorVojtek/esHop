/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { FormGroup, Label, Input, Row, Col, Container } from 'reactstrap';
import { REGISTER_CUSTOMER_MUTATION } from '../../app-data/graphql/mutation';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../app-data/lib/state/Reducer';

// import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import {
  Wrapper,
  Form,
  Button,
  RegisterButton,
  P,
  H4,
} from '../../app-data/shared/styles/components/Auth';
import { Context } from '../../app-data/lib/state/Store';

import Modal from '../../app-data/shared/components/Modal';
import { Danger } from '../../app-data/shared/components/LoginRegisterModal/styles';

const Register: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [userExist, setUserExist] = useState(false);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const [isOlder, setIsOlder] = useState(false);
  const { dispatch } = useContext(Context);
  const passwordEl = useRef(null);
  const [registerUserMutate] = useMutation(REGISTER_CUSTOMER_MUTATION);

  const handleSetErrorMessage: (message: string) => void = (message) => {
    const parsedMessage: string = message.replace('GraphQL error:', ' ').trim();

    setErrorMessage(parsedMessage);
    dispatch({ type: 'SET_MODAL', payload: true });
  };

  const handleSubmitRegister: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    if (isMatchPass) {
      try {
        const form = event.currentTarget;
        const email = form.email.value;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        await registerUserMutate({
          variables: {
            customerData: {
              email,
              firstName,
              lastName,
              password,
            },
          },
        });
      } catch (err) {
        setUserExist(true);
      }
    }
  };

  const matchPassoword = (e) => {
    e.target.value === passwordEl.current.value
      ? setIsMatchPass(true)
      : setIsMatchPass(false);
  };

  return (
    <Layout>
      <Modal>
        <p>{errorMessage}</p>
      </Modal>
      <Wrapper>
        <Container>
          <H4 className="mt-4">Registrácia</H4>
          <Form onSubmit={handleSubmitRegister}>
            <Row form>
              <Col md={6}>
                <FormGroup className="mb-2">
                  <Label htmlFor="firstName">Meno</Label>
                  <Input id="firstName" name="firstName" type="text" required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="mb-2">
                  <Label htmlFor="lastName">Priezvisko</Label>
                  <Input id="lastName" name="lastName" type="text" required />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mb-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </FormGroup>
            <FormGroup className="mb-2">
              <Label htmlFor="tel">Telefón</Label>
              <Input id="tel" name="tel" type="tel" required />
            </FormGroup>
            <FormGroup className="mb-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                name="password"
                type="password"
                innerRef={passwordEl}
                required
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <Label htmlFor="retypePassword">Zopakovať heslo</Label>
              <Input
                id="retypePassword"
                name="retypePassword"
                type="password"
                onChange={matchPassoword}
              />
            </FormGroup>
            {userExist && <Danger>Účet už existuje</Danger>}
            {!isMatchPass && <Danger>Hesla sa nezhodujú</Danger>}
            <P>
              Odoslaním formulára súhlasím so{' '}
              <Link href="/pravidla-ochrany-osobnych-udajov">
                <a target="_blank">spracovaním osobných údajov</a>
              </Link>
              .
            </P>

            <FormGroup className="mb-2" check>
              <Label check>
                <Input type="checkbox" required /> Som starší ako 16 rokov.
              </Label>
            </FormGroup>
            <FormGroup className="mb-2" check>
              <Label check>
                <Input type="checkbox" />{' '}
                <Link href="/pravidla-ochrany-osobnych-udajov">
                  <a target="_blank">Súhlasím</a>
                </Link>{' '}
                so zasielaním newslettrov
              </Label>
            </FormGroup>
            <FormGroup className="mb-2" check>
              <Label check>
                <Input type="checkbox" />{' '}
                <Link href="/pravidla-ochrany-osobnych-udajov">
                  <a target="_blank">Súhlasím</a>
                </Link>{' '}
                s používaním emailu na marketingové účely
              </Label>
            </FormGroup>
            <Button type="submit">Registrovať</Button>
            <P className="mt-2">
              Už máte konto?{' '}
              <Link href="prihlasenie">
                <RegisterButton>Prihláste sa</RegisterButton>
              </Link>
            </P>
          </Form>
        </Container>
      </Wrapper>
    </Layout>
  );
};

export default withSetCart(Register);
