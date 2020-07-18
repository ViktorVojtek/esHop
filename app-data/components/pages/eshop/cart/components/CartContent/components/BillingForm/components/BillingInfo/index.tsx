import React, { useState } from 'react';
import { Col, Row, FormGroup, Input, Label, Collapse } from 'reactstrap';

import countryData from './data/country.data.json';
import { H4, H5 } from '../../../../../../styles/cart.style';

const BillingInfo: () => JSX.Element = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdress, setIsOpenAdress] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleAdress = () => setIsOpenAdress(!isOpenAdress);

  return (
    <Col md={6}>
      <H4 className="mb-5">2. Fakturačné údaje</H4>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="firstName">Meno *</Label>
            <Input type="text" name="firstName" id="firstName" required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="lastName">Priezvisko *</Label>
            <Input type="text" name="lastName" id="lastName" required />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup check className="mb-3">
        <Label check>
          <Input type="checkbox" onClick={toggle} /> Som podnikateľ (PO, SZČO)
        </Label>
      </FormGroup>
      <Collapse isOpen={isOpen}>
        <FormGroup>
          <Label htmlFor="companyTitle">Názov spoločnosti</Label>
          <Input type="text" name="companyTitle" id="companyTitle" />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="companyId">IČO</Label>
              <Input type="text" name="companyId" id="companyId" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="VATID">DIČ</Label>
              <Input type="text" name="VATID" id="VATID" />
            </FormGroup>
          </Col>
        </Row>
      </Collapse>
      <FormGroup>
        <Label>Adresa *</Label>
        <Input type="text" nam="street" id="street" required />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="postCode">PSČ *</Label>
            <Input type="text" name="postCode" id="postCode" required />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="city">Mesto *</Label>
            <Input type="text" name="city" id="city" required />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label htmlFor="country">Štát *</Label>
        <Input
          type="select"
          name="country"
          id="country"
          defaultValue={0}
          required
        >
          <option value={0}>Zvoľte štát</option>
          {countryData.map((item) => (
            <option value={item.value} key={item.value}>
              {item.text}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup check className="mb-3">
        <Label check>
          <Input type="checkbox" onClick={toggleAdress} /> Dodacia adresa je iná
          ako fakturačná ?
        </Label>
      </FormGroup>
      <Collapse isOpen={isOpenAdress}>
        <FormGroup>
          <Label>Adresa dodania</Label>
          <Input type="text" nam="street" id="streetDelivery" />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="postCodeDelivery">PSČ</Label>
              <Input type="text" name="postCode" id="postCodeDelivery" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="cityDelivery">Mesto</Label>
              <Input type="text" name="city" id="cityDelivery" />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label htmlFor="countryDelivery">Štát</Label>
          <Input
            type="select"
            name="country"
            id="countryDelivery"
            defaultValue={0}
          >
            <option value={0}>Zvoľte štát</option>
            {countryData.map((item) => (
              <option value={item.value} key={item.value}>
                {item.text}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Collapse>
      <FormGroup>
        <Label htmlFor="phone">Telefónne číslo *</Label>
        <Input type="tel" name="phone" id="phone" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <Input type="email" name="email" id="email" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="message">Správa</Label>
        <Input type="textarea" name="message" id="message" />
      </FormGroup>{' '}
    </Col>
  );
};

export default BillingInfo;
