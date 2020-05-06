/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useRef } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { REGISTER_USER_MUTATION } from '../../../app-data/graphql/mutation';
import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import { Wrapper } from '../../../app-data/shared/styles/components/Auth';

const Register: FC = () => {
  const passwordRef = useRef(null);
  const [registerUserMutate, { loading }] = useMutation(REGISTER_USER_MUTATION);

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
    </Layout>
  );
};

export default Register;
