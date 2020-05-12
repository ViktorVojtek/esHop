import React, { FC } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import countryData from './country.data.json';

const BillingForm: FC = () => (
  <Form
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }}
  >
    <Row>
      <Col md={6}>
        <h4 className="mb-5">2. Fakturačné údaje</h4>
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
        <FormGroup>
          <Label>Ulica *</Label>
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
        <FormGroup>
          <Label htmlFor="phone">Telefón</Label>
          <Input type="tel" name="phone" id="phone" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input type="email" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Správa</Label>
          <Input type="textarea" name="message" id="message" />
        </FormGroup>{' '}
      </Col>
      <Col md={6}>
        <h4 className="mb-5">3. Súhrn košíka</h4>
        <Row form>
          <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
            <p>Spolu:</p>
          </Col>
          <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
            <p className="text-right">0.00,-€</p>
          </Col>
        </Row>
        <h5 className="mb-4">Spôsob doručenia</h5>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="courier">
                  <Input type="radio" name="courier" id="courier" /> Kuriér
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">3.9,-€</p>
          </Col>
        </Row>{' '}
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="personalCollection">
                  <Input
                    type="radio"
                    name="personalCollection"
                    id="personalCollection"
                  />{' '}
                  Osobný odber
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">FREE</p>
          </Col>
        </Row>{' '}
        <h5 className="mb-4">Spôsob platby</h5>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="card">
                  <Input type="radio" name="card" id="card" /> Platba kartou
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">Zadarmo</p>
          </Col>
        </Row>{' '}
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="cod">
                  <Input type="radio" name="cod" id="cod" /> Dobierka
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">1,-€</p>
          </Col>
        </Row>{' '}
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="pcc">
                  <Input type="radio" name="pcc" id="pcc" /> Osobný odber
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">Zadarmo</p>
          </Col>
        </Row>{' '}
        <Row form>
          <Col md={6} className="mt-3 mb-3">
            Zľavový kód:
          </Col>
          <Col md={6} className="mt-3 mb-3">
            <Row>
              <Col>
                <Input type="text" name="discountCode" id="discountCode" />
              </Col>
              <Col>
                <Button
                  type="button"
                  onClick={() => console.log('Discount')}
                  className="w-100"
                >
                  Použiť
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row form>
          <Col md={6} className="border-top border-bottom pt-3">
            <p>Spolu s DPH:</p>
          </Col>
          <Col md={6} className="border-top border-bottom pt-3">
            <p className="text-right">12.5,-€</p>
          </Col>
        </Row>
      </Col>
    </Row>

    <FormGroup>
      <Button type="submit" color="primary" disabled>
        Odoslať
      </Button>
    </FormGroup>
  </Form>
);

export default BillingForm;
