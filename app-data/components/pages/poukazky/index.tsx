import React from 'react';
import { Form, FormGroup, Container, Row, Col, Input } from 'reactstrap';
import ServicesList from './components/ServicesList/index';
import SubPageBackground from '../../../shared/components/SubPageBackground';

import {
  H3, Wrapper, RadioInput, RadioGroup, Label, H4, RadioColorGroup,
  RadioColorInput, ColorLabel, NumberLabel, AddToCart,
} from './styles';

const PoukazkyPage: () => JSX.Element = () => (
  <Wrapper>
    <SubPageBackground title="Darčekové poukážky" imageUrl="/images/eshop/background.jpg"/>
    <Container>
      <H3>VYBER SI VLASTNÚ DARČEKOVÚ POUKÁŽKU</H3>
      <Form>
        <FormGroup>
          <RadioGroup>
          <Row>
            <Col md="6">
              <RadioInput type="radio" id="poukazka-1" name="poukazky" value="poukazka-1" />
              <Label htmlFor="poukazka-1" imageUrl="https://kupelecks.sk/wp-content/uploads/2018/10/dppobytp.png"></Label>
            </Col>
            <Col md="6">
              <RadioInput type="radio" id="poukazka-2" name="poukazky" value="poukazka-2" />
              <Label htmlFor="poukazka-2" imageUrl="https://kupelecks.sk/wp-content/uploads/2018/10/dpproceduryp.png"></Label>
            </Col>
            <Col md="6">
              <RadioInput type="radio" id="poukazka-3" name="poukazky" value="poukazka-3" />
              <Label htmlFor="poukazka-3" imageUrl="https://kupelecks.sk/wp-content/uploads/2018/10/dpsumap.png"></Label>
            </Col>
            <Col md="6">
              <RadioInput type="radio" id="poukazka-4" name="poukazky" value="poukazka-4" />
              <Label htmlFor="poukazka-4" imageUrl="https://kupelecks.sk/wp-content/uploads/2019/03/dppermap.png"></Label>
            </Col>
          </Row>
          </RadioGroup>
        </FormGroup>
      </Form>
      <H3>ALEBO SI VYTVOR VLASTNÚ</H3>
      <Form>
        <H4>Zvoľte farbu poukážky:</H4>
        <FormGroup>
          <RadioColorGroup>
            <div>
              <RadioColorInput type="radio" id="color-1" name="colors" value="color-1" />
              <ColorLabel htmlFor="color-1" colorButton="red"></ColorLabel>
            </div>
            <div>
              <RadioColorInput type="radio" id="color-2" name="colors" value="color-2" />
              <ColorLabel htmlFor="color-2" colorButton="blue"></ColorLabel>
            </div>
            <div>
              <RadioColorInput type="radio" id="color-3" name="colors" value="color-3" />
              <ColorLabel htmlFor="color-3" colorButton="green"></ColorLabel>
            </div>
            <div>
              <RadioColorInput type="radio" id="color-4" name="colors" value="color-4" />
              <ColorLabel htmlFor="color-4" colorButton="pink"></ColorLabel>
            </div>
            <div>
              <RadioColorInput type="radio" id="color-5" name="colors" value="color-5" />
              <ColorLabel htmlFor="color-5" colorButton="cyan"></ColorLabel>
            </div>
            <div>
              <RadioColorInput type="radio" id="color-6" name="colors" value="color-6" />
              <ColorLabel htmlFor="color-6" colorButton="orange"></ColorLabel>
            </div>
          </RadioColorGroup>
        </FormGroup>
        <H4>Zvoľte služby alebo zadajte hodnotu poukážky:</H4>
        <FormGroup className="mt-4 mb-4">
          <NumberLabel htmlFor="suma">Zadajte sumu</NumberLabel>
          <Input style={{maxWidth: '300px'}} type="number" name="text" id="suma" placeholder='50' min='50' />
        </FormGroup>
         <ServicesList />
        <H4 className="mt-2 mb-4">Napíšte venovanie:</H4>
        <FormGroup>
          <Input type="textarea" name="text" id="venovanie" rows="5" />
        </FormGroup>
        <AddToCart>Pridať do košíka</AddToCart>
      </Form>
    </Container>
  </Wrapper>
);

export default PoukazkyPage;
