import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { Button, colors } from '../../../../shared/design';

const Wrapper = styled.div`
  margin-top: 140px;
  min-height: calc(100vh - 562px);
`;

const H2 = styled.h2`
  color: black;
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 32px;
`;

const Text = styled.p`
  text-align: center;
  color: #5e8796;
  margin-top: 2rem;
  font-size: 1rem;
  a {
    color: ${colors.primary};
  }
`;

const UL = styled.ul`
  text-align: center;
  list-style-position: inside;
`;

const LI = styled.li`
  font-weight: bold;
  line-height: 2;
  a {
    color: ${colors.primary};
  }
  color: #5e8796;
`;

const Img = styled.img`
  width: 100%;
`;

export const InfoPoukazkyPage = () => (
  <Wrapper>
    <Container>
      <H2>DARČEKOVÉ POUKÁŽKY</H2>
      <Text>
        Hľadáte vhodný darček pre svoju rodinu, známych či priateľov? Darujte
        nezabudnuteľný zážitok z Pienin. Venujte svojim najbližším dokonalý
        relax, wellness, pobyt alebo permanentku v KÚPEĽOCH ČERVENÝ KLÁŠTOR
        Smerdžonka.
      </Text>
      <Text>
        Vytvorili sme darčekové poukážky z našich najobľúbenejších produktov.
      </Text>
      <Text>
        <strong>Darčeková poukážka môže byť vystavená na:</strong>
      </Text>
      <UL>
        <LI>vstup do wellness s bazénom,</LI>
        <LI>
          <Link href="/eshop?subcategory=Pobyty">pobyt</Link> v KÚPEĽOCH ČERVENÝ
          KLÁŠTOR Smerdžonka,
        </LI>
        <LI>
          <Link href="/eshop?subcategory=Relaxačné+procedúry">relaxačné</Link> a{' '}
          <Link href="/eshop?subcategory=Liečebné+procedúry">liečebné</Link>{' '}
          procedúry,
        </LI>
        <LI>
          <Link href="/eshop?subcategory=Permanentky">permanentky</Link>(vstup
          do wellness, procedúry) alebo
        </LI>
        <LI>vám vystavíme darčekovú poukážku v želanej hodnote.</LI>
      </UL>
      <Row>
        <Col md={6} className="mt-4">
          <Text>Predná stranka:</Text>
          <Img src="/poukazky_info/1.jpg" />
        </Col>
        <Col md={6} className="mt-4">
          <Text>Vnútro darčekovej poukážky:</Text>
          <Img src="/poukazky_info/1_back.png" />
        </Col>
      </Row>
      <Text>
        <strong>Darčeková poukážka s osobným venovaním</strong>
      </Text>
      <Text>
        Prekvapenie šité na mieru. Venujte svojim blízkym originálny darček a
        potešte ich nezabudnuteľným darčekom s vašim vlastným venovaním. Naše
        darčekové poukážky majú vo vnútri dostatočný priestor na vaše venovanie
        alebo vyznanie.
      </Text>
      <Text>
        Na poukážku tento text venovania vytlačíme presne podľa vášho želania a
        tým je darček osobnejší, milší, vtipnejší a výnimočnejší.
      </Text>
      <Row>
        <Col md={6} className="mt-4">
          <Text>Predná stranka:</Text>
          <Img src="/poukazky_info/2.jpg" />
        </Col>
        <Col md={6} className="mt-4">
          <Text>Vnútro darčekovej poukážky:</Text>
          <Img src="/poukazky_info/2_back.png" />
        </Col>
      </Row>
      <Text>
        Naša darčeková poukážka sa hodí na každú príležitosť či už ide o
        blahoželanie k meninám, k narodeninám, k životnému jubileu, k výročiu, k
        zvláštnej príležitosti počas roka alebo na uzmierenie &#128522;
      </Text>
      <Text>
        <strong>Darujete prekvapenie</strong>
      </Text>
      <Text>
        Vaši najbližší zažijú čarovný moment prekvapenia, keďže obdarovaný si
        nájde svoj darček (pobyt, procedúry, permanentku alebo hodnotu) až po
        otvorení darčekovej poukážky.
      </Text>
      <Row>
        <Col md={6} className="mt-4">
          <Text>Predná stranka:</Text>
          <Img src="/poukazky_info/3.jpg" />
        </Col>
        <Col md={6} className="mt-4">
          <Text>Vnútro darčekovej poukážky:</Text>
          <Img src="/poukazky_info/3_back.png" />
        </Col>
      </Row>
      <Text>
        <strong>Neviete si vybrať?</strong>
      </Text>
      <Text>
        Nevadí. Darujte svojim blízkym darčekový poukaz s konkrétnou hodnotou
        (od 10 €) a nechajte ich, aby si sami vybrali, čo im urobí radosť!
        Vyberať môžete tiež zo širokej ponuky{' '}
        <Link href="/eshop?subcategory=Pobyty">pobytových balíčkov</Link>, na
        ktoré Vám radi vystavíme náš darčekový poukaz. Darovať môžete aj
        konkrétne{' '}
        <Link href="/eshop?subcategory=Relaxačné+procedúry">relaxačné</Link> a{' '}
        <Link href="/eshop?subcategory=Liečebné+procedúry">liečebné</Link>{' '}
        procedúry, <Link href="/eshop/produkt/pqage">kozmetické procedúry</Link>{' '}
        či extra zvýhodnené{' '}
        <Link href="/eshop?subcategory=Permanentky">permanentky</Link>.
      </Text>
      <Row>
        <Col md={6} className="mt-4">
          <Text>Predná stranka:</Text>
          <Img src="/poukazky_info/4.jpg" />
        </Col>
        <Col md={6} className="mt-4">
          <Text>Vnútro darčekovej poukážky:</Text>
          <Img src="/poukazky_info/4_back.png" />
        </Col>
      </Row>
      <Text>
        Túto špeciálnu Darčekovú poukážku vám podľa možností vieme vytvoriť aj
        na počkanie (platí počas pracovných dní, o možnostiach vytvorenia na
        počkanie sa informujte na recepcii DOMU ZDRAVIA alebo na recepcii
        DOMČEKOV.
      </Text>
      <Text>
        DARČEKOVÚ POUKÁŽKU SI MÔŽETE RÝCHLO A POHODLNE OBJEDNAŤ NA NAŠOM
        E-SHOPE, KDE MÔŽETE VIDIEŤ AJ <strong>ĎALŠIE MOTÍVY NA VÝBER</strong>:
      </Text>
      <Link href="/darcekove-poukazky">
        <Button style={{ margin: '0 auto' }}>Vytvor darčekovú poukážku</Button>
      </Link>
      <Text>Darčeková poukážka je platná 1 rok od dátumu vystavenia.</Text>
    </Container>
  </Wrapper>
);
