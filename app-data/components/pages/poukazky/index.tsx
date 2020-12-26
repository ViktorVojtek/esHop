import React, { useState, useContext, useEffect } from 'react';
import { Form, FormGroup, Container, Row, Col, Input } from 'reactstrap';
import PoukazkaTypes from './components/PoukazkaTypes';
import StayType from './components/StayType';
import MoneyType from './components/MoneyType';
import {
  Wrapper,
  H4,
  RadioColorGroup,
  RadioColorInput,
  ColorLabel,
  Preview,
  PreviewHolder,
  PrednaStranaText,
  PreviewTextHolder,
  StyledModalLink,
  H3,
} from './styles';
import { Context } from '../../../lib/state/Store';
import Link from 'next/link';
import ProductModal from '../../../shared/components/ProductModal';
import Summary from './components/Summary';
import { ProductButton } from '../../../shared/design';

type ServiceData = {
  title: string;
  price: number;
  count: number;
};

export type IProductToCartData = {
  cardColor: string;
  priceValue: number;
  text: string;
  services: ServiceData[];
};

const PoukazkyPage: () => JSX.Element = () => {
  const [formData, setFormData] = useState<IProductToCartData>({
    cardColor: '#00aeef',
    priceValue: 0,
    text: '',
    services: [],
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
    const { cardColor, priceValue, text, services } = data;
    let price = Number(priceValue);
    dispatch({
      type: 'ADD_TO_GIFT_CARDS',
      payload: { cardColor, price, text, services, type: 'poukazka' },
    });
  };

  useEffect(() => {
    setFormData({
      cardColor: color,
      priceValue: 0,
      text: frontText,
      services: [],
    });
  }, [activeType]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };
  const handleProcedure = (items) => {
    setFormData({
      ...formData,
      priceValue: getPrice(items),
      services: items,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddGiftCard(formData);
    dispatch({ type: 'SET_PRODUCT_MODAL', payload: true });
  };
  return (
    <Wrapper>
      <Container>
        <H3 style={{ marginBottom: '100px' }}>
          Vytvorte si darčekovú poukážku a potešte svojich blízkych
        </H3>
        <PoukazkaTypes getActiveType={setActiveType} />
        <Form onSubmit={handleSubmit}>
          <div id="voucherContent" style={{ minHeight: '1px' }}>
            {activeType === 0 && (
              <StayType handleProcedure={handleProcedure} formData={formData} />
            )}
            {activeType === 2 && <MoneyType handleChange={handleChange} />}
          </div>
          <>
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
              </Col>
              <Col md="6">
                <H4>Zadajte text na prednej strane:</H4>
                <FormGroup className="mt-4">
                  <Input
                    type="textarea"
                    name="text"
                    placeholder="Zadajte text"
                    id="frontText"
                    required
                    maxLength={140}
                    onChange={(e) => {
                      handleChangeTextArea(e);
                      handleChange(e);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md="6" className="mb-4">
                <H4>Súhrn poukážky:</H4>
                <Summary formData={formData} setFormData={setFormData} />
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
            <ProductButton type="submit">Pridať do košíka</ProductButton>
          </>
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
