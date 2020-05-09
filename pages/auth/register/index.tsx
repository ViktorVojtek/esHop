/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { REGISTER_USER_MUTATION } from '../../../app-data/graphql/mutation';

// import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import { Wrapper } from '../../../app-data/shared/styles/components/Auth';
import { Context } from '../../../app-data/lib/state/Store';

import Modal from '../../../app-data/shared/components/Modal';

const Register: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useContext(Context);
  const passwordRef = useRef(null);
  const [registerUserMutate] = useMutation(REGISTER_USER_MUTATION);

  const handleSetErrorMessage: (message: string) => void = (message) => {
    const parsedMessage: string = message.replace('GraphQL error:', ' ').trim();

    setErrorMessage(parsedMessage);
    dispatch({ type: 'SET_MODAL', payload: true });
  };

  const handleSubmitRegister: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const password = form.password.value;

      await registerUserMutate({
        variables: {
          userRegInput: {
            admin: false,
            email,
            firstName,
            lastName,
            password,
            role: 1,
          },
        },
      });
    } catch (err) {
      console.log(err);
      handleSetErrorMessage(err.message);
    }
  };
  const checkPassword: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const password = event.currentTarget.value;
    const passwToCheck = passwordRef.current.value;

    if (password !== passwToCheck) {
      event.currentTarget.setCustomValidity('Passwords not match.');
      event.currentTarget.reportValidity();
    } else {
      event.currentTarget.setCustomValidity('');
    }
  };

  return (
    <>
      <Modal>
        <p>{errorMessage}</p>
      </Modal>
      <Wrapper>
        <Form onSubmit={handleSubmitRegister}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" type="text" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" type="text" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              innerRef={passwordRef}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="retypePassword">Retype Password</Label>
            <Input
              id="retypePassword"
              name="retypePassword"
              type="password"
              onChange={checkPassword}
            />
          </FormGroup>
          <Button type="submit">Send</Button>
          <p>
            <small>
              You allready have an account? Please{' '}
              <Link href="/auth/login">
                <a>log in</a>
              </Link>
              .
            </small>
          </p>
        </Form>
      </Wrapper>
    </>
  );
};

export default Register;
