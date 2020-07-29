import React, { useState } from 'react';
import { Col, Row, FormGroup, Input, Label, Collapse } from 'reactstrap';

import countryData from './data/country.data.json';
import { H4, H5 } from '../../../../../../styles/cart.style';

interface IData {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVatNum: string;
  companyDVATNum: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  optionalAddress: string;
  optionalPostalCode: string;
  optionalCity: string;
  phone: string;
  email: string;
  message: string;
  deliveryMethode: string;
  paymentMethode: string;
  totalPrice: number;
  products: any[];
}
interface IProps {
  data?: IData;
  handleData?: (data: IData) => void;
}

const BillingInfo: (props: IProps) => JSX.Element = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdress, setIsOpenAdress] = useState(false);
  const { data, handleData } = props;

  const toggle = () => setIsOpen(!isOpen);
  const toggleAdress = () => setIsOpenAdress(!isOpenAdress);

  const {
    address,
    city,
    firstName,
    companyName,
    lastName,
    postalCode,
    companyVatNum,
    companyDVATNum,
    optionalAddress,
    optionalPostalCode,
    optionalCity,
    phone,
    email,
    message,
    deliveryMethode,
    paymentMethode,
    totalPrice,
  } = data;

  return (
    <Col md={6}>
      <H4 className="mb-5">2. Fakturačné údaje</H4>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="firstName">Meno *</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName || ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const firstName = event.currentTarget.value;

                handleData({
                  ...data,
                  firstName,
                });
              }}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="lastName">Priezvisko *</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const lastName = event.currentTarget.value;

                handleData({
                  ...data,
                  lastName,
                });
              }}
              value={lastName || ''}
              required
            />
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
          <Input
            type="text"
            name="companyTitle"
            id="companyTitle"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const companyName = event.currentTarget.value;

              handleData({
                ...data,
                companyName,
              });
            }}
            value={companyName || ''}
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="companyId">IČO</Label>
              <Input
                type="text"
                name="companyId"
                id="companyId"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const companyVatNum = event.currentTarget.value;

                  handleData({
                    ...data,
                    companyVatNum,
                  });
                }}
                value={companyVatNum || ''}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="VATID">DIČ</Label>
              <Input
                type="text"
                name="VATID"
                id="VATID"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const companyDVATNum = event.currentTarget.value;

                  handleData({
                    ...data,
                    companyDVATNum,
                  });
                }}
                value={companyDVATNum || ''}
              />
            </FormGroup>
          </Col>
        </Row>
      </Collapse>
      <FormGroup>
        <Label>Adresa *</Label>
        <Input
          type="text"
          nam="street"
          id="street"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const address = event.currentTarget.value;

            handleData({
              ...data,
              address,
            });
          }}
          value={address || ''}
          required
        />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="postCode">PSČ *</Label>
            <Input
              type="text"
              name="postCode"
              id="postCode"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const postalCode = event.currentTarget.value;

                handleData({
                  ...data,
                  postalCode,
                });
              }}
              value={postalCode || ''}
              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label htmlFor="city">Mesto *</Label>
            <Input
              type="text"
              name="city"
              id="city"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const city = event.currentTarget.value;

                handleData({
                  ...data,
                  city,
                });
              }}
              value={city || ''}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label htmlFor="country">Štát *</Label>
        <Input
          type="select"
          name="country"
          id="country"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const state = event.currentTarget.value;

            handleData({
              ...data,
              state,
            });
          }}
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
          <Input
            type="text"
            nam="street"
            id="streetDelivery"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const optionalAddress = event.currentTarget.value;

              handleData({
                ...data,
                optionalAddress,
              });
            }}
            value={optionalAddress || ''}
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="postCodeDelivery">PSČ</Label>
              <Input
                type="text"
                name="postCode"
                id="postCodeDelivery"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const optionalPostalCode = event.currentTarget.value;

                  handleData({
                    ...data,
                    optionalPostalCode,
                  });
                }}
                value={optionalPostalCode || ''}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="cityDelivery">Mesto</Label>
              <Input
                type="text"
                name="city"
                id="cityDelivery"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const optionalCity = event.currentTarget.value;

                  handleData({
                    ...data,
                    optionalCity,
                  });
                }}
                value={optionalCity || ''}
              />
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
        <Input
          type="tel"
          name="phone"
          id="phone"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const phone = event.currentTarget.value;

            handleData({
              ...data,
              phone,
            });
          }}
          value={phone || ''}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const email = event.currentTarget.value;

            handleData({
              ...data,
              email,
            });
          }}
          value={email || ''}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="message">Správa</Label>
        <Input
          type="textarea"
          name="message"
          id="message"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const message = event.currentTarget.value;

            handleData({
              ...data,
              message,
            });
          }}
          value={message || ''}
        />
      </FormGroup>{' '}
    </Col>
  );
};

export default BillingInfo;
