/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useContext } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useMutation } from '@apollo/react-hooks';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import ForgetPasswordModal from '../ForgetPasswordModal';
import { Context } from '../../../lib/state/Store';
import { LOGIN_CUSTOMER_MUTATION } from '../../../graphql/mutation';
import { login } from '../../../lib/authCustomer';
import { P, RegisterButton } from '../../styles/components/Auth';
import { Button } from '../../design';
import ErrorMessage from '../ErrorMessage';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';

const LogIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });
  const [isError, setIsError] = useState(false);
  const { dispatch } = useContext(Context);
  const [loginUserMutate] = useMutation(LOGIN_CUSTOMER_MUTATION);
  const [modal, setModal] = useState(false);
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

      const recaptchaToken = await executeRecaptcha('login');

      const response = await loginUserMutate({
        variables: {
          customerData: {
            email: loginValues.email,
            password: loginValues.password,
            recaptchaToken,
          },
        },
      });

      const {
        data: {
          logInCustomer: { _id, firstName, lastName, token, email },
        },
      } = response;

      login({
        _id,
        firstName,
        email,
        lastName,
        token,
      });
      setIsError(false);
    } catch (err) {
      err && handleSetErrorMessage(err.message);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  return (
    <>
      <ValidatorForm onSubmit={handleSubmitLogin} className={classes.root}>
        <TextValidator
          label="Email*"
          variant="outlined"
          type="email"
          name="email"
          value={loginValues.email}
          validators={['required', 'matchRegexp:^.{1,}@[^.]{1,}']}
          errorMessages={['Povinné pole', 'Neplatná emailová adresa']}
          fullWidth
          onChange={handleChange}
        />
        <TextValidator
          label="Heslo*"
          variant="outlined"
          type="password"
          name="password"
          value={loginValues.password}
          validators={['required']}
          errorMessages={['Povinné pole']}
          fullWidth
          onChange={handleChange}
        />
        <ErrorMessage message={errorMessage} open={isError} />
        {errorMessage === 'Používateľ nie je verifikovaný!' && (
          <Link href="/verifikovat-ucet">
            <RegisterButton>Verifikovať účet</RegisterButton>
          </Link>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '.5rem',
          }}
        >
          <Button style={{ marginTop: '.5rem' }} type="submit">
            Prihlásiť
          </Button>
          <P style={{ margin: '0' }}>
            <RegisterButton onClick={toggle}>Zabudnuté heslo</RegisterButton>
          </P>
        </div>
      </ValidatorForm>
      <ForgetPasswordModal setModal={setModal} modal={modal} />
    </>
  );
};

export default LogIn;

const useStyles = makeStyles({
  root: {
    marginTop: '1.5rem',
    '& .MuiFormControl-root': {
      marginBottom: '1rem',
    },
  },
});
