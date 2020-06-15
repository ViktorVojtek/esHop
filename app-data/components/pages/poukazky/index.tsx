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
  const [imageSrc, setImageSrc] = useState("https://kupelecks.sk/wp-content/uploads/2018/10/dppobytp.png");
  const [imageBackSrc, setImageBackSrc] = useState("https://kupelecks.sk/wp-content/uploads/2018/10/dpproceduryv.png");
  const [color, setColor] = useState("#00aeef");
  const [frontText, setFrontText] = useState("Miesto pre váš text");
  const [backText, setBackText] = useState("Miesto pre váš text");

  const handleChangeTextArea = (event) => {
    setFrontText(event.target.value);
  };
  const handleChangeTextAreaBack = (event) => {
    setBackText(event.target.value);
  };
  return(
    <Wrapper>
      <SubPageBackground title="Darčekové poukážky" imageUrl="/images/eshop/background.jpg"/>
      <Container>
        <H3>Zvoľ typ darčekovej poukážky</H3>
        <PoukazkaTypes getActiveType={setActiveType} />
        <div id="voucherContent">
          { activeType === 0 ? <StayType /> : null }
          { activeType === 2 ? <MoneyType /> : null }
          { activeType === 3 ? <RestaurantType /> : null }
        </div>
        <Form>
          <H4>Zvoľte farbu poukážky:</H4>
          <Row className="mt-4">
            <Col md="6">
              <FormGroup className="mt-4">
                <RadioColorGroup>
                  <div>
                    <RadioColorInput
                      type="radio"
                      id="color-1"
                      name="colors"
                      value="color-1"
                      onChange={() => {setImageBackSrc("https://kupelecks.sk/wp-content/uploads/2018/10/dpproceduryv.png"); setImageSrc("https://kupelecks.sk/wp-content/uploads/2018/10/dppobytp.png"); setColor("#00aeef");}} />
                    <ColorLabel htmlFor="color-1" colorButton="#00aeef"></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                    type="radio"
                    id="color-2"
                    name="colors"
                    value="color-2"
                    onChange={() => {setImageBackSrc("https://kupelecks.sk/wp-content/uploads/2018/10/dppobytv.png");setImageSrc("https://kupelecks.sk/wp-content/uploads/2018/10/dpproceduryp.png"); setColor("red")}} />
                    <ColorLabel htmlFor="color-2" colorButton="red"></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                    type="radio"
                    id="color-3"
                    name="colors"
                    value="color-3"
                    onChange={() => {setImageBackSrc("https://kupelecks.sk/wp-content/uploads/2018/10/dpsumav.png");setImageSrc("https://kupelecks.sk/wp-content/uploads/2018/10/dpsumap.png"); setColor("yellow")}} />
                    <ColorLabel htmlFor="color-3" colorButton="yellow"></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                    type="radio"
                    id="color-4"
                    name="colors"
                    value="color-4"
                    onChange={() => {setImageBackSrc("https://kupelecks.sk/wp-content/uploads/2019/03/dppermav.png");setImageSrc("https://kupelecks.sk/wp-content/uploads/2019/03/dppermap.png"); setColor("green")}} />
                    <ColorLabel htmlFor="color-4" colorButton="green"></ColorLabel>
                  </div>
                </RadioColorGroup>
              </FormGroup>
            </Col>
            <Col md="6">
              <Preview src={imageSrc} alt="poukazka" />
            </Col>
          </Row>
          <H4>Zadajte text na prednej strane:</H4>
          <Row className="mt-4">
            <Col md="6">
              <FormGroup className="mt-4">
                <Input type="textarea" name="text" placeholder="Zadajte text" id="frontText" onChange={(e) => handleChangeTextArea(e)} />
              </FormGroup>
            </Col>
            <Col md="6">
              <PreviewHolder>
                <Preview src={imageSrc} alt="poukazka" />
                <PreviewTextHolder>
                  <PrednaStranaText colorText={color}>{frontText}</PrednaStranaText>
                </PreviewTextHolder>
              </PreviewHolder>
            </Col>
          </Row>
          <H4>Zadajte text na zadnej strane:</H4>
          <Row className="mt-4">
            <Col md="6">
              <FormGroup className="mt-4">
                <Input type="textarea" name="text" placeholder="Zadajte text" id="backText" onChange={(e) => handleChangeTextAreaBack(e)} />
              </FormGroup>
            </Col>
            <Col md="6">
              <PreviewHolder>
                <Preview src={imageBackSrc} alt="poukazka" />
                <PreviewTextHolderBack>
                  <PrednaStranaText colorText={color}>{backText}</PrednaStranaText>
                </PreviewTextHolderBack>
              </PreviewHolder>
            </Col>
          </Row>
          <AddToCart>Pridať do košíka</AddToCart>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default PoukazkyPage;
