import React, { FC } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Wrapper, H1, H4 } from './style';

type RezervationFormType = {
  title: string;
};

const ReservationForm: FC = () => {
  return (
    <Wrapper>
      <Container>
        <H1>Rezervácia služieb a pobytov</H1>
        <H4>
          Pre nezáväznú objednávku naších služieb prosím vyplňte rezervačný
          formulár.
          <br /> Uveďte dátum prípadne dalšie informácie.
        </H4>
        <Form>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="fname">Meno *</Label>
                <Input type="text" name="fname" id="fname" required />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="fname">Priezvisko *</Label>
                <Input type="text" name="fname" id="fname" required />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="email">Email *</Label>
            <Input type="email" name="email" id="email" required />
          </FormGroup>
          <FormGroup>
            <Label for="tel">Tel. číslo *</Label>
            <Input type="tel" name="tel" id="tel" required />
          </FormGroup>
          <FormGroup>
            <Label for="service_name">Názov služby</Label>
            <Input type="text" name="service_name" id="service_name" />
          </FormGroup>
          <FormGroup>
            <Label for="message">Správa</Label>
            <Input type="textarea" name="text" id="message" rows={4} />
          </FormGroup>
          <Button>Rezervovať</Button>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default ReservationForm;
