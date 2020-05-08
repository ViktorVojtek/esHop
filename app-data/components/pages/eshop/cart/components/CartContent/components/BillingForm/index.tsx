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
              <option value={item.value} key={item.value}>
                {item.text}
              </option>
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
        </FormGroup>{' '}
      </Col>
      <Col md={6}>
        <h4 className="mt-5">3. Cart Summary</h4>
        <Row form>
          <Col md={6}>
            <p>Total:</p>
          </Col>
          <Col md={6}>
            <p className="text-right">0.00,-€</p>
          </Col>
        </Row>
        <h5>Choose delivery method</h5>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="courier">
                  <Input type="radio" name="courier" id="courier" /> Kurier
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
                  Personal collection
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">FREE</p>
          </Col>
        </Row>{' '}
        <h5>Choose payment method</h5>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="card">
                  <Input type="radio" name="card" id="card" /> Card payment
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">FREE</p>
          </Col>
        </Row>{' '}
        <Row form>
          <Col md={6}>
            <FormGroup>
              <FormGroup check>
                <Label htmlFor="cod">
                  <Input type="radio" name="cod" id="cod" /> Cash on delivery
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
                  <Input type="radio" name="pcc" id="pcc" /> Personal collection
                  in cash
                </Label>
              </FormGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <p className="text-right">FREE</p>
          </Col>
        </Row>{' '}
        <Row form>
          <Col md={6}>Use discount code:</Col>
          <Col md={6}>
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
                  Use
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <p>Total price with VAT:</p>
          </Col>
          <Col md={6}>
            <p className="text-right">12.5,-€</p>
          </Col>
        </Row>
      </Col>
    </Row>

    <FormGroup>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default BillingForm;
