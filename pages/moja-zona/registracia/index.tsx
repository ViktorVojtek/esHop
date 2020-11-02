/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
} from 'reactstrap';
import {
  REGISTER_CUSTOMER_MUTATION,
  ADD_TO_MARKETING_LIST,
} from '../../../app-data/graphql/mutation';
import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../app-data/lib/state/Reducer';

// import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import {
  Wrapper,
  Form,
  Button,
  RegisterButton,
  P,
  H4,
} from '../../../app-data/shared/styles/components/Auth';
import { Context } from '../../../app-data/lib/state/Store';
import { Danger } from '../../../app-data/shared/components/LoginRegisterModal/styles';

const Register: FC = () => {
  const [userExist, setUserExist] = useState(false);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const { dispatch } = useContext(Context);
  const passwordEl = useRef(null);
  const subscribeEl = useRef(null);
  const marketingEl = useRef(null);
  const [modal, setModal] = useState(false);
  const [registerUserMutate] = useMutation(REGISTER_CUSTOMER_MUTATION);
  const [addToMarketingList] = useMutation(ADD_TO_MARKETING_LIST);

  const toggle = () => setModal(!modal);

  const handleSubmitRegister: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    if (isMatchPass) {
      try {
        const form = event.currentTarget;
        const email = form.email.value;
        const tel = form.tel.value;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        await registerUserMutate({
          variables: {
            customerData: {
              email,
              tel,
              firstName,
              lastName,
              password,
            },
          },
        });
        if (subscribeEl.current.checked) {
          await fetch('/subscribe', {
            body: JSON.stringify({
              email: email,
              fname: firstName,
              lname: lastName,
              tel: tel,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        }
        if (marketingEl.current.checked) {
          const response = await addToMarketingList({
            variables: {
              marketingListData: {
                email,
                tel,
                firstName,
                lastName,
              },
            },
          });
          console.log('response', response);
        }
        toggle();
      } catch (err) {
        console.log(err);
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <h4>Vaša registrácia prebehla úspešne.</h4>
          <p>
            Pre úspešne dokončenie registrácie kliknite na link, ktorý Vám
            prišiel emailom.
          </p>
          <Link href="prihlasenie">
            <Button>Prihláste sa</Button>
          </Link>
        </ModalBody>
      </Modal>
      <Wrapper>
        <H4>Registrácia</H4>
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
          <Row form>
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>
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
              <Input type="checkbox" innerRef={subscribeEl} />{' '}
              <Link href="/pravidla-ochrany-osobnych-udajov">
                <a target="_blank">Súhlasím</a>
              </Link>{' '}
              so zasielaním noviniek
            </Label>
          </FormGroup>
          <FormGroup className="mb-2" check>
            <Label check>
              <Input type="checkbox" innerRef={marketingEl} />{' '}
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
      </Wrapper>
    </Layout>
  );
};

export default withSetCart(Register);
