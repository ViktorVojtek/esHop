import React, { FC, Dispatch, SetStateAction } from 'react';
import {
  H2,
  MoneyIcon,
  ProceduresIcon,
  Card,
  Circle,
  P,
  CreateCard,
} from './styles';
import { Row, Col } from 'reactstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

interface IPoukazky {
  getActiveType: Dispatch<SetStateAction<number>>;
}

const PoukazkaTypes: FC<IPoukazky> = ({ getActiveType }) => {
  const handleSetActiveCategory: (id: number) => void = (id) => {
    getActiveType(id);
  };
  return (
    <Row className="justify-content-center">
      <Col md="4" className="mobile-card">
        <Card>
          <Circle>
            <MoneyIcon />
          </Circle>
          <H2>Peniaze</H2>
          <P>Zvoľte ľubovoľnú sumu poukážky</P>
          <P>Zvoľte farbu poukážky</P>
          <P>Napíšte originálne venovanie</P>
          <P>Urobte radosť blízkym</P>
          <div className="mt-4">
            <AnchorLink offset={() => 120} href="#voucherContent">
              <CreateCard onClick={() => handleSetActiveCategory(2)}>
                Vytvoriť poukážku
              </CreateCard>
            </AnchorLink>
          </div>
        </Card>
      </Col>
      <Col md="4" className="mobile-card">
        <Card>
          <Circle>
            <ProceduresIcon />
          </Circle>
          <H2>Služby</H2>
          <P>Zvoľte ľubovoľné služby</P>
          <P>Zvoľte farbu poukážky</P>
          <P>Napíšte originálne venovanie</P>
          <P>Urobte radosť blízkym</P>
          <div className="mt-4">
            <AnchorLink offset={() => 120} href="#voucherContent">
              <CreateCard onClick={() => handleSetActiveCategory(0)}>
                Vytvoriť poukážku
              </CreateCard>
            </AnchorLink>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default PoukazkaTypes;
