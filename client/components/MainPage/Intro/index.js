import React, { useState } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';
import {
  Wrapper, Left, Right, H1, H3, H4
} from './styles';
import { LinkButton } from '../../../shared/styles/global.style';
import CarouselProducts from './components/Carousel';
import CarouselTextItem from './components/CarouselTextItem';

const Intro = () => {
  
  const [activeItem, setActiveItem] = useState(0);
  console.log(activeItem);

  return(
    <Wrapper>
      <Container fluid>
        <Row>
          <Col lg="4" md="12">
            <Left>
              <H3>Červený Kláštor</H3>
              <H1>Zdravie až na prvom mieste.</H1>
              <H4>Zavítajte do výnimočných kúpeľov s bohatou históriou a odneste si nezabudnuteľné zážitky, ktoré Vás prijmú k návratu.</H4>
              <LinkButton href="#products">Viac o službách</LinkButton>
            </Left>
          </Col>
          <Col lg="8" md="12">
            <Right>
              <CarouselProducts
                setActiveItem = {setActiveItem}
              />
              <Row className="mt-4">
                <Col md="4" xs="12" className={activeItem == 0 ? "active-text" : ""}>
                  <CarouselTextItem
                    number = {'01'}
                    header = {'Produkty'}
                    text = {`Vyskúšajte jedinečné produkty jedného z najstarších a tradičných výrobcov wellness
                      kozmetiky na Slovensku.`}
                  />
                </Col>
                <Col md="4" xs="12" className={activeItem == 1 ? "active-text" : ""}>
                  <CarouselTextItem
                    number = {'02'}
                    header = {'Služby'}
                    text = {`Naše darčekové poukážky prinášajú na prednej strane veľký priestor na Vaše
                    venovanie alebo vyznanie. `}
                  />
                </Col>
                <Col md="4" xs="12" className={activeItem == 2 ? "active-text" : ""}>
                  <CarouselTextItem
                    number = {'03'}
                    header = {'Pobyty'}
                    text = {`Využite lukratívnu ponuku zvýhodnených pobytov.
                      Tešíme sa na stretnutie s Vami.`}
                  />
                </Col>
              </Row>
            </Right>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
};

export default Intro;