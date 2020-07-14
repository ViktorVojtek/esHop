import React, { useState, useContext } from 'react';
import { Form, FormGroup, Container, Row, Col, Input } from 'reactstrap';
import ServicesList from './components/ServicesList/index';
import SubPageBackground from '../../../shared/components/SubPageBackground';
import PoukazkaTypes from './components/PoukazkaTypes';
import StayType from './components/StayType';
import MoneyType from './components/MoneyType';
import RestaurantType from './components/RestaurantType';
import {
  H3,
  Wrapper,
  RadioInput,
  RadioGroup,
  Label,
  H4,
  RadioColorGroup,
  RadioColorInput,
  ColorLabel,
  NumberLabel,
  AddToCart,
  Preview,
  PreviewHolder,
  PrednaStranaText,
  PreviewTextHolder,
  PreviewTextHolderBack,
  StyledModalLink,
} from './styles';
import { Context } from '../../../lib/state/Store';
import Link from 'next/link';
import ProductModal from '../../../shared/components/ProductModal';

type IProductToCartData = {
  cardColor: string;
  priceValue: number;
  text: string;
};

const PoukazkyPage: () => JSX.Element = () => {
  const [formData, setFormData] = useState<IProductToCartData>({
    cardColor: '#00aeef',
    priceValue: 0,
    text: '',
  });
  const [activeType, setActiveType] = useState(2);
  const [imageSrc, setImageSrc] = useState(
    '/images/poukazky/poukazka_modra.png'
  );
  const [color, setColor] = useState('#00aeef');
  const [frontText, setFrontText] = useState('Miesto pre váš text');
  const { dispatch } = useContext(Context);

  const handleChangeTextArea = (event) => {
    setFrontText(event.target.value);
  };

  const handleAddGiftCard: (data: IProductToCartData) => void = (data) => {
    const { cardColor, priceValue, text } = data;
    let price = Number(priceValue);
    dispatch({
      type: 'ADD_TO_GIFT_CARDS',
      payload: { cardColor, price, text },
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddGiftCard(formData);
    dispatch({ type: 'SET_PRODUCT_MODAL', payload: true });
  };
  return (
    <Wrapper>
      <SubPageBackground
        title="Darčekové poukážky"
        imageUrl="/images/eshop/background.jpg"
      />
      <Container>
        {/*<H3>Zvoľ typ darčekovej poukážky</H3>
        <PoukazkaTypes getActiveType={setActiveType} />*/}
        <Form onSubmit={handleSubmit}>
          <div id="voucherContent">
            {activeType === 0 ? <StayType /> : null}
            {activeType === 2 ? (
              <MoneyType handleChange={handleChange} />
            ) : null}
            {activeType === 3 ? <RestaurantType /> : null}
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
                      name="cardColor"
                      value="#00aeef"
                      onChange={(e) => {
                        setImageSrc('/images/poukazky/poukazka_modra.png');
                        setColor('#00aeef');
                        handleChange(e);
                      }}
                    />
                    <ColorLabel
                      htmlFor="color-1"
                      colorButton="#00aeef"
                    ></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                      type="radio"
                      id="color-2"
                      name="cardColor"
                      value="#ff0000"
                      onChange={(e) => {
                        setImageSrc('/images/poukazky/poukazka_cervena.png');
                        setColor('#ff0000');
                        handleChange(e);
                      }}
                    />
                    <ColorLabel
                      htmlFor="color-2"
                      colorButton="#ff0000"
                    ></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                      type="radio"
                      id="color-3"
                      name="cardColor"
                      value="#FBC200"
                      onChange={(e) => {
                        setImageSrc('/images/poukazky/poukazka_zlta.png');
                        setColor('#FBC200');
                        handleChange(e);
                      }}
                    />
                    <ColorLabel
                      htmlFor="color-3"
                      colorButton="#FBC200"
                    ></ColorLabel>
                  </div>
                  <div>
                    <RadioColorInput
                      type="radio"
                      id="color-4"
                      name="cardColor"
                      value="#00BF0B"
                      onChange={(e) => {
                        setImageSrc('/images/poukazky/poukazka_zelena.png');
                        setColor('#00BF0B');
                        handleChange(e);
                      }}
                    />
                    <ColorLabel
                      htmlFor="color-4"
                      colorButton="#00BF0B"
                    ></ColorLabel>
                  </div>
                </RadioColorGroup>
              </FormGroup>
              <H4>Zadajte text na prednej strane:</H4>
              <FormGroup className="mt-4">
                <Input
                  type="textarea"
                  name="text"
                  placeholder="Zadajte text"
                  id="frontText"
                  required
                  onChange={(e) => {
                    handleChangeTextArea(e);
                    handleChange(e);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="6" className="d-flex align-items-center">
              <PreviewHolder>
                <Preview src={imageSrc} alt="poukazka" />
                <PreviewTextHolder>
                  <PrednaStranaText colorText={color}>
                    {frontText}
                  </PrednaStranaText>
                </PreviewTextHolder>
              </PreviewHolder>
            </Col>
          </Row>
          <AddToCart type="submit">Pridať do košíka</AddToCart>
        </Form>
      </Container>
      <ProductModal
        message="Pokračujte v nákupe alebo do pokladne."
        title="Darčeková poukážka bola vytvorená a pridaná do košíka."
      >
        <Link href="/eshop/cart">
          <StyledModalLink
            color="primary"
            onClick={() =>
              dispatch({ type: 'SET_PRODUCT_MODAL', payload: false })
            }
          >
            Do pokladne
          </StyledModalLink>
        </Link>
        <Link href="/eshop">
          <StyledModalLink
            color="primary"
            onClick={() =>
              dispatch({ type: 'SET_PRODUCT_MODAL', payload: false })
            }
          >
            Nakupovať
          </StyledModalLink>
        </Link>
      </ProductModal>
    </Wrapper>
  );
};

export default PoukazkyPage;
