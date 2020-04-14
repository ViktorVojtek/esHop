/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { REGISTER_USER_MUTATION } from '../../../client/app-data/graphql/mutation';
import Layout from '../../../client/shared/components/Layout';
import { Wrapper } from '../../../client/shared/styles/components/Auth';

const Register = () => {
  const passwordRef = useRef();
  const [registerUserMutate, { error, loading }] = useMutation(REGISTER_USER_MUTATION);

  const handleSubmitRegister = async (event) => {
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
    }
  };
  const checkPassword = (event) => {
    const password = event.currentTarget.value;
    const passwToCheck = passwordRef.current.value;

    if (password !== passwToCheck) {
      event.currentTarget.setCustomValidity('Passwords not match.');
      event.currentTarget.reportValidity();
    } else {
      event.currentTarget.setCustomValidity('');
    }
  };

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  return (
    <Layout>
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
            <Input id="password" name="password" type="password" innerRef={passwordRef} required />
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
              You allready have an account? Please
              {' '}
              <Link href="/auth/login">
                <a>log in</a>
              </Link>
              .
            </small>
          </p>
        </Form>
      </Wrapper>
    </Layout>
  );
};

export default Register;
