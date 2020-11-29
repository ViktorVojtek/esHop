/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import Link from 'next/link';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Wrapper } from '../../styles/components/Auth';

import Modal from '../Modal';

type RegisterProps = {
  errorMsg?: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterForm: (props: RegisterProps) => JSX.Element = (props) => {
  const { errorMsg, submitHandler } = props;
  const passwordRef = useRef<HTMLInputElement>(null);

  const checkPassword: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const password: string = event.currentTarget.value;
    const passwToCheck: string = passwordRef.current.value;

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
        <p>{errorMsg || ''}</p>
      </Modal>
      <Wrapper style={{ maxWidth: '400px' }}>
        <Form onSubmit={submitHandler}>
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

export default RegisterForm;
