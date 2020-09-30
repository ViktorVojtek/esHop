import React, { FC, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { REMOVE_CUSTOMER_MUTATION } from '../../../../graphql/mutation';
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

type ISettings = {
  id: string;
};

const Settings: FC<ISettings> = ({ id }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [removeCutomer] = useMutation(REMOVE_CUSTOMER_MUTATION);
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

      Router.push('/moja-zona/prihlasenie');
    } catch (err) {
      console.log(err);
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
          <P className="mt-4">
            <strong>Zrušiť príjimanie marketingových emailov:</strong>
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
          <Form style={{ maxWidth: '400px' }}>
            <FormGroup>
              <Label for="oldPassword">Vaše heslo</Label>
              <Input
                type="password"
                name="password"
                id="oldPassword"
                placeholder="Zadajte heslo"
              />
            </FormGroup>
            <FormGroup>
              <Label for="oldPassword">Nové heslo</Label>
              <Input
                type="password"
                name="password"
                id="newPassword"
                placeholder="Zadajte nové heslo"
              />
            </FormGroup>
            <FormGroup>
              <Label for="newPasswordCheck">Zopakujte nové heslo</Label>
              <Input
                type="password"
                name="password"
                id="newPasswordCheck"
                placeholder="Zopakujte nové heslo"
              />
            </FormGroup>
            <Button>Zmeniť heslo</Button>
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
