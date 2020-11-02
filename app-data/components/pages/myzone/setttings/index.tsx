import React, { FC, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { REMOVE_CUSTOMER_MUTATION } from '../../../../graphql/mutation';
import { CHANGE_CUSTOMERZONE_PASSWORD_MUTATION } from '../../../../graphql/mutation';
import {
  Spinner,
  Input,
  Form,
  Label,
  FormGroup,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { P, H2 } from '../mojaZona';
import Router from 'next/router';
import cookie from 'js-cookie';
import { Danger } from '../../../../shared/components/LoginRegisterModal/styles';
import { useSnackbar } from 'notistack';
import { logout } from '../../../../lib/auth';

type ISettings = {
  id: string;
};

const Settings: FC<ISettings> = ({ id }) => {
  const [modal, setModal] = useState(false);
  const oldPassEl = useRef(null);
  const submitEl = useRef(null);
  const passwordEl = useRef(null);
  const toggle = () => setModal(!modal);
  const [removeCutomer] = useMutation(REMOVE_CUSTOMER_MUTATION);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const [changeCustomerPassword] = useMutation(
    CHANGE_CUSTOMERZONE_PASSWORD_MUTATION
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { error, loading, data } = useQuery(CUSTOMER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <Spinner />;
  }

  const { customer } = data;

  const handleDeleteUser: () => Promise<void> = async () => {
    console.log(id);
    try {
      await removeCutomer({ variables: { id: id } });

      cookie.remove('customerToken');
      cookie.remove('customerId');
      cookie.remove('customerFName');
      cookie.remove('customerLName');

      Router.push('/moja-zona/prihlasenie');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePassword: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const oldPassword = form.oldPassword.value;
      const newPassword = form.newPassword.value;
      submitEl.current.setAttribute('disabled', 'disabled');
      const response = await changeCustomerPassword({
        variables: { id, oldPass: oldPassword, newPass: newPassword },
      });
      enqueueSnackbar('Heslo bolo úspešne zmenené', {
        variant: 'success',
      });
      form.reset();
    } catch (err) {
      //isError(true);
      const parsedMessage: string = err.message
        .replace('GraphQL error:', ' ')
        .trim();
      if (parsedMessage === 'Customer not found') {
        enqueueSnackbar('Nesprávne používateľske heslo', {
          variant: 'error',
        });
      }
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
      <H2>Nastavenie účtu:</H2>
      <Row>
        <Col md={6}>
          <P>
            <strong>Meno:</strong> <span>{customer.firstName}</span>
          </P>
          <P>
            <strong>Priezvisko:</strong> <span>{customer.lastName}</span>
          </P>
          <P>
            <strong>Email:</strong> <span>{customer.email}</span>
          </P>
          <P>
            <strong>Tel:</strong> <span>{customer.tel}</span>
          </P>
          <P className="mt-4">
            <strong>
              Zrušenie súhlasu na spracovanie osobných údajov na reklamné účely:
            </strong>
          </P>
          <Button>Zrušiť</Button>
          <P className="mt-4">
            <strong>Zrušenie účtu:</strong>
          </P>
          <Button
            style={{ background: 'red', border: 'none' }}
            onClick={toggle}
          >
            Zrušiť účet
          </Button>
        </Col>
        <Col md={6}>
          <P>
            <strong>Zmena hesla:</strong>
          </P>
          <Form style={{ maxWidth: '400px' }} onSubmit={handleChangePassword}>
            <FormGroup>
              <Label for="oldPassword">Vaše heslo</Label>
              <Input
                type="password"
                name="password"
                id="oldPassword"
                placeholder="Zadajte heslo"
                required
                innerRef={oldPassEl}
              />
            </FormGroup>
            <FormGroup>
              <Label for="oldPassword">Nové heslo</Label>
              <Input
                type="password"
                name="password"
                id="newPassword"
                placeholder="Zadajte nové heslo"
                innerRef={passwordEl}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="newPasswordCheck">Zopakujte nové heslo</Label>
              <Input
                type="password"
                name="password"
                id="newPasswordCheck"
                placeholder="Zopakujte nové heslo"
                onChange={matchPassoword}
                required
              />
            </FormGroup>
            {!isMatchPass && <Danger>Hesla sa nezhodujú</Danger>}
            <Button type="submit" innerRef={submitEl}>
              Zmeniť heslo
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Zrušenie účtu</ModalHeader>
        <ModalBody>
          <p>Naozaj chcete zrušiť svoj účet ?</p>
          <p>
            <strong>
              Stratíte všetky vernostné body a prehľad svojich objednávok.
            </strong>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Späť
          </Button>{' '}
          <Button color="danger" onClick={handleDeleteUser}>
            Zrušiť účet
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Settings;
