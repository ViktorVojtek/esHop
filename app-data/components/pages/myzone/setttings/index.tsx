import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import {
  Spinner,
  Input,
  Form,
  Label,
  FormGroup,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { P, H2 } from '../mojaZona';

type ISettings = {
  id: string;
};

const Settings: FC<ISettings> = ({ id }) => {
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
          <Button style={{ background: 'red', border: 'none' }}>
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
    </>
  );
};

export default Settings;
