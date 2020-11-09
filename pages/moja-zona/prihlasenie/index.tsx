/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useContext } from 'react';
import { FormGroup, Input } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_CUSTOMER_MUTATION } from '../../../app-data/graphql/mutation';
import Link from 'next/link';
import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import {
  Wrapper,
  Form,
  Button,
  H4,
  RegisterButton,
  P,
} from '../../../app-data/shared/styles/components/Auth';
import { login } from '../../../app-data/lib/authCustomer';
import { Context } from '../../../app-data/lib/state/Store';
import ErrorMessage from '../../../app-data/shared/components/ErrorMessage';
import ForgetPasswordModal from '../../../app-data/shared/components/ForgetPasswordModal';

const LogIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { dispatch } = useContext(Context);
  const [loginUserMutate] = useMutation(LOGIN_CUSTOMER_MUTATION);
  const [modal, setModal] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const toggle = () => setModal(!modal);

  const handleSetErrorMessage: (message: string) => void = (message) => {
    const parsedMessage: string = message.replace('GraphQL error:', ' ').trim();
    parsedMessage.includes('Incorrect') &&
      setErrorMessage('Nesprávne prihlasovacie údaje!');
    parsedMessage.includes('User not exist') &&
      setErrorMessage('Používateľ neexistuje!');
    parsedMessage.includes('not verified') &&
      setErrorMessage('Používateľ nie je verifikovaný!');

    setIsError(true);
    dispatch({ type: 'SET_MODAL', payload: true });
  };

  const handleSubmitLogin: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      if (!executeRecaptcha) {
        return;
      }

      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      const recaptchaToken = await executeRecaptcha('login');

      const response = await loginUserMutate({
        variables: {
          customerData: {
            email,
            password,
            recaptchaToken,
          },
        },
      });

      const {
        data: {
          logInCustomer: { _id, firstName, lastName, token },
        },
      } = response;

      login({
        _id,
        firstName,
        lastName,
        token,
      });
      setIsError(false);
    } catch (err) {
      handleSetErrorMessage(err.message);
    }
  };

  return (
    <Layout>
      <Wrapper style={{ maxWidth: '400px', width: '100%' }}>
        <H4 className="text-center">Prihlásenie</H4>
        <Form onSubmit={handleSubmitLogin}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" type="email" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Heslo</label>
            <Input id="password" name="password" type="password" />
          </FormGroup>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <P>
              <Link href="registracia">
                <RegisterButton>Zaregistrujte sa</RegisterButton>
              </Link>
            </P>
            <P>
              <RegisterButton onClick={toggle}>Zabudnuté heslo</RegisterButton>
            </P>
          </div>

          <ErrorMessage message={errorMessage} open={isError} />
          <Button type="submit">Prihlásiť</Button>
        </Form>
      </Wrapper>
      <ForgetPasswordModal setModal={setModal} modal={modal} />
    </Layout>
  );
};

export default LogIn;
