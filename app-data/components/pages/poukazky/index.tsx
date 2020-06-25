import React, { useState } from 'react';
import { Form, FormGroup, Container, Row, Col, Input } from 'reactstrap';
import ServicesList from './components/ServicesList/index';
import SubPageBackground from '../../../shared/components/SubPageBackground';
import PoukazkaTypes from './components/PoukazkaTypes';
import StayType from './components/StayType';
import MoneyType from './components/MoneyType';
import RestaurantType from './components/RestaurantType';
import {
  H3, Wrapper, RadioInput, RadioGroup, Label, H4, RadioColorGroup,
  RadioColorInput, ColorLabel, NumberLabel, AddToCart, Preview, PreviewHolder,
  PrednaStranaText, PreviewTextHolder, PreviewTextHolderBack,
} from './styles';

const PoukazkyPage: () => JSX.Element = () => {
  const [activeType, setActiveType] = useState(0);
  const [imageSrc, setImageSrc] = useState("/images/poukazky/poukazka_modra.png");
  const [color, setColor] = useState("#00aeef");
  const [frontText, setFrontText] = useState("Miesto pre váš text");

  const handleChangeTextArea = (event) => {
    setFrontText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return(
    <Wrapper>
      <SubPageBackground title="Darčekové poukážky" imageUrl="/images/eshop/background.jpg"/>
      <Container>
        <H3>Zvoľ typ darčekovej poukážky</H3>
        <PoukazkaTypes getActiveType={setActiveType} />
        <Form onSubmit={handleSubmit}>
          <div id="voucherContent">
            { activeType === 0 ? <StayType /> : null }
            { activeType === 2 ? <MoneyType /> : null }
            { activeType === 3 ? <RestaurantType /> : null }
          </div>
          <Row className="mt-8">
            <Col md="6" className="pr-4">
              <H4>Zvoľte farbu poukážky:</H4>
              <FormGroup className="mt-4 mb-4">
                <RadioColorGroup>
                  <div>
                    <RadioColorInput
                      type="radio"
                      id="color-1"
                      name="colors"
                      value="color-1"
                      onChange={() => {setImageSrc("/images/poukazky/poukazka_modra.png"); setColor("#00aeef");}} />
                    <ColorLabel htmlFor="color-1" colorButton="#00aeef"></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                    type="radio"
                    id="color-2"
                    name="colors"
                    value="color-2"
                    onChange={() => {setImageSrc("/images/poukazky/poukazka_cervena.png"); setColor("#ff0000")}} />
                    <ColorLabel htmlFor="color-2" colorButton="#ff0000"></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                    type="radio"
                    id="color-3"
                    name="colors"
                    value="color-3"
                    onChange={() => {setImageSrc("/images/poukazky/poukazka_zlta.png"); setColor("#FBC200")}} />
                    <ColorLabel htmlFor="color-3" colorButton="#FBC200"></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                    type="radio"
                    id="color-4"
                    name="colors"
                    value="color-4"
                    onChange={() => {setImageSrc("/images/poukazky/poukazka_zelena.png"); setColor("#00BF0B")}} />
                    <ColorLabel htmlFor="color-4" colorButton="#00BF0B"></ColorLabel>
                  </div>
                </RadioColorGroup>
              </FormGroup>
              <H4>Zadajte text na prednej strane:</H4>
              <FormGroup className="mt-4">
                <Input type="textarea" name="text" placeholder="Zadajte text" id="frontText" onChange={(e) => handleChangeTextArea(e)} />
              </FormGroup>
            </Col>
            <Col md="6" className="d-flex align-items-center">
              <PreviewHolder>
                <Preview src={imageSrc} alt="poukazka" />
                <PreviewTextHolder>
                  <PrednaStranaText colorText={color}>{frontText}</PrednaStranaText>
                </PreviewTextHolder>
              </PreviewHolder>
            </Col>
          </Row>
          <AddToCart type="submit">Pridať do košíka</AddToCart>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default PoukazkyPage;
