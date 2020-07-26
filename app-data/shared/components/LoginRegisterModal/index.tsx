import React, { useState, FC, useRef } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';

import { StyledModalBtn, RegisterButton, P, Danger } from './styles/index';
import {
  REGISTER_CUSTOMER_MUTATION,
  LOGIN_CUSTOMER_MUTATION,
} from '../../../graphql/mutation';
import { login } from '../../../lib/authCustomer';

interface ILoginRegisterModal {
  loginModal: boolean;
  setLoginModal: (boolean) => void;
}

const LoginRegisterModal: FC<ILoginRegisterModal> = ({
  loginModal,
  setLoginModal,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const [userExist, setUserExist] = useState(false);
  const [badLogin, setBadLogin] = useState(false);
  const passwordEl = useRef(null);
  const toggle = () => {
    setLoginModal(!loginModal);
    setIsLogin(true);
  };
  const [createUser] = useMutation(REGISTER_CUSTOMER_MUTATION);
  const [loginUser] = useMutation(LOGIN_CUSTOMER_MUTATION);

  const handleSubmitLogin: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    try {
      event.preventDefault();

      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email);
      console.log(password);

      const {
        data: {
          loginUser: { _id, firstName, lastName, token },
        },
      } = await loginUser({
        variables: {
          customerData: {
            email,
            password,
          },
        },
      });
      login({
        _id,
        firstName,
        lastName,
        token,
      });
    } catch (err) {
      console.log(err);
      setBadLogin(true);
    }
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

      await createUser({
        variables: {
          customerData: {
            email,
            firstName,
            lastName,
            password,
          },
        },
      });
      setIsLogin(true);
    } catch (err) {
      setUserExist(true);
    }
  };

  const matchPassoword = (e) => {
    e.target.value === passwordEl.current.value
      ? setIsMatchPass(true)
      : setIsMatchPass(false);
  };

  return (
    <div>
      <Modal isOpen={loginModal} toggle={toggle}>
        {isLogin ? (
          <>
            <ModalHeader toggle={toggle}>Prihlásenie</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmitLogin}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Zadajte email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Zadajte heslo"
                    required
                  />
                </FormGroup>
                <P>
                  Nemáte účet?{' '}
                  <RegisterButton onClick={() => setIsLogin(false)}>
                    Zaregistrujte sa
                  </RegisterButton>
                </P>
                {badLogin && <Danger>Nesprávne meno alebo heslo</Danger>}
                <StyledModalBtn type="submit">Prihlásiť</StyledModalBtn>
              </Form>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader toggle={toggle}>Registrácia</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmitRegister}>
                <FormGroup>
                  <Label className="font-weight-bold" for="firstName">
                    Meno
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Zadajte meno"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="lastName">
                    Priezvisko
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Zadajte priezvisko"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Zadajte email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="password">
                    Heslo
                  </Label>
                  <Input
                    innerRef={passwordEl}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Zadajte heslo"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="font-weight-bold" for="checkPassword">
                    Zopakujte Heslo
                  </Label>
                  <Input
                    onChange={(event) => matchPassoword(event)}
                    type="password"
                    name="checkPassword"
                    id="checkPassword"
                    placeholder="Zadajte heslo"
                    required
                  />
                </FormGroup>
                {userExist && <Danger>Účet už existuje</Danger>}
                {!isMatchPass && <Danger>Hesla sa nezhodujú</Danger>}
                <StyledModalBtn disabled={!isMatchPass} type="submit">
                  Zaregistrovať
                </StyledModalBtn>
              </Form>
            </ModalBody>
          </>
        )}
      </Modal>
    </div>
  );
};

export default LoginRegisterModal;
