import React, { FC, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { REMOVE_CUSTOMER_MUTATION } from '../../../../graphql/mutation';
import { CHANGE_CUSTOMERZONE_PASSWORD_MUTATION } from '../../../../graphql/mutation';
import {
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
import { P, H2, H6 } from '../mojaZona';
import Router from 'next/router';
import cookie from 'js-cookie';
import { Danger } from '../../../../shared/components/LoginRegisterModal/styles';
import { useSnackbar } from 'notistack';
import { Paper } from '@material-ui/core';
import CustomSpinner from '../../../../shared/components/CustomSpinner/CustomerSpinner';
import PersonalInfo from './PersonalInfo';

type ISettings = {
  id: string;
};

const Settings: FC<ISettings> = ({ id }) => {
  const [modal, setModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const oldPassEl = useRef(null);
  const submitEl = useRef(null);
  const passwordEl = useRef(null);
  const toggle = () => setModal(!modal);
  const [removeCutomer] = useMutation(REMOVE_CUSTOMER_MUTATION);
  const [isMatchPass, setIsMatchPass] = useState(true);
  const [changeCustomerPassword] = useMutation(
    CHANGE_CUSTOMERZONE_PASSWORD_MUTATION
  );
  const { error, loading, data } = useQuery(CUSTOMER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <CustomSpinner />;
  }

  const { customer } = data;

  const handleDeleteUser: () => Promise<void> = async () => {
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
      <Row className="mb-4 mt-4">
        <Col md={12}>
          <PersonalInfo id={id} customer={customer} toggle={toggle} />
        </Col>
        <Col md={6}>
          <H2 className="mb-4">Zmena hesla</H2>
          <Paper elevation={3} style={{ padding: '32px 16px' }}>
            <Form
              style={{ maxWidth: '400px', margin: '0 auto' }}
              onSubmit={handleChangePassword}
            >
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
              <Button
                type="submit"
                innerRef={submitEl}
                style={{ backgroundColor: '#007bff' }}
              >
                Zmeniť heslo
              </Button>
            </Form>
          </Paper>
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
