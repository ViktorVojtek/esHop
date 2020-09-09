import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { H1, H2, Wrapper, P, Span, A, ContactHolder } from './styles';
import FaqItem from './components/faqItem';

const faq = [
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: 'What is Lorem Ipsum?',
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const KontaktPage = () => (
  <Wrapper>
    <Container>
      <H1>Kontakt a FAQ</H1>
      <Row>
        <Col md="6">
          <H2 className="w-100">Kontakt</H2>
          <div className="mt-4">
            <P>Červený Kláštor 147</P>
            <P>059 06 Červený Kláštor</P>
            <ContactHolder>
              <Span>Email: </Span>
              <A href="mailto:eshop@kupelecks.sk">eshop@kupelecks.sk</A>
            </ContactHolder>
            <ContactHolder>
              <Span>Tel: </Span>
              <A href="tel:+421911904880">+421 911 904 880</A>
            </ContactHolder>
          </div>
        </Col>
        <Col md="6">
          <H2 className="w-100">Rezervácie</H2>
          <div className="mt-4">
            <P>Červený Kláštor 147</P>
            <P>059 06 Červený Kláštor</P>
            <ContactHolder>
              <Span>Email: </Span>
              <A href="mailto:rezervacie@kupelecks.sk">
                rezervacie@kupelecks.sk
              </A>
            </ContactHolder>
            <ContactHolder>
              <Span>Tel: </Span>
              <A href="tel:+421914338829">+421 914 338 829</A>
            </ContactHolder>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <H2 className="w-100 mt-4">Odberné miesta</H2>
        </Col>
      </Row>
      <Row>
        <Col md="6" className="align-items-center">
          <div className="mt-4">
            <P>Červený Kláštor 12</P>
            <P>Červený Kláštor - Kúpele</P>
            <P>059 06 Červený Kláštor</P>
            <ContactHolder>
              <Span>Email: </Span>
              <A href="mailto:eshop@kupelecks.sk">eshop@kupelecks.sk</A>
            </ContactHolder>
            <ContactHolder>
              <Span>Tel: </Span>
              <A href="tel:+421911904880">+421 911 904 880</A>
            </ContactHolder>
          </div>
        </Col>
        <Col md="6">
          <div className="mt-4">
            <P>Popradská 6</P>
            <P>Cestovná agentúra</P>
            <P>064 01 Stará Ľubovňa</P>
            <ContactHolder>
              <Span>Email: </Span>
              <A href="mailto:rezervacie@kupelecks.sk">info@kupelecks.sk</A>
            </ContactHolder>
            <ContactHolder>
              <Span>Tel: </Span>
              <A href="tel:+421914338829">+421 914 338 829</A>
            </ContactHolder>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <H2 className="w-100 mt-4 mb-4">FAQ</H2>
          {faq.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} />
          ))}
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

export default KontaktPage;
