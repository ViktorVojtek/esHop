import React, { FC } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import countryData from './country.data.json';

const BillingForm: FC = () => (
  <Form
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }}
  >
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="firstName">Name *</Label>
          <Input type="text" name="firstName" id="firstName" required />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="lastName">Surname *</Label>
          <Input type="text" name="lastName" id="lastName" required />
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label htmlFor="companyTitle">Company Title</Label>
      <Input type="text" name="companyTitle" id="companyTitle" />
    </FormGroup>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="companyId">Company Id</Label>
          <Input type="text" name="companyId" id="companyId" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="VATID">VAT Id</Label>
          <Input type="text" name="VATID" id="VATID" />
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label>Street *</Label>
      <Input type="text" nam="street" id="street" required />
    </FormGroup>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="postCode">Post Code *</Label>
          <Input type="text" name="postCode" id="postCode" required />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="city">City *</Label>
          <Input type="text" name="city" id="city" required />
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label htmlFor="country">Country *</Label>
      <Input
        type="select"
        name="country"
        id="country"
        defaultValue={0}
        required
      >
        <option value={0}>Select country</option>
        {countryData.map((item) => (
          <option value={item.value}>{item.text}</option>
        ))}
      </Input>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="phone">Telephone</Label>
      <Input type="tel" name="phone" id="phone" />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="email">Email *</Label>
      <Input type="email" name="email" id="email" />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="message">Message</Label>
      <Input type="textarea" name="message" id="message" />
    </FormGroup>
    <FormGroup>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default BillingForm;
