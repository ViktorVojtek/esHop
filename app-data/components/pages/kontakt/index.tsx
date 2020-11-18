import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {
  H1,
  H2,
  Wrapper,
  P,
  Span,
  A,
  ContactHolder,
  Card,
  ImgHolder,
  Circle,
  Smooth,
} from './styles';
import FaqItem from './components/faqItem';

const faq = [
  {
    question:
      'Je možné objednať si tovar v e-shope a vyzdvihnúť na odbernom mieste? Ak áno, aké sú podmienky ?',
    answer:
      'Áno, je možné tovar si objednať v e-shope a osobne prevziať na odbernom mieste. Pri osobnom odbere na odbernom mieste nie je možné meniť objednávku z e-shopu. Objednávka je záväzná. <strong>Pri vyzdvihnutí objednávky je možné platiť v hotovosti alebo platobnou kartou. Pri osobnom odbere kupujúci neplatí poštovné a balné.</strong>( zvýraznené neviem, či môže byť. Musíš porozmýšľať, či môžu ľudia platiť aj pri osobnom odbere tovaru)',
  },
  {
    question: 'Je povinná registrácia ?',
    answer:
      'Nie, registrácia nie je povinná. Pri objednávke je ale potrebné vyplniť údaje potrebné k zaslaniu tovaru. Ak ste však pravidelným odberateľom je pre vás pohodlnejšie sa registrovať a ušetriť čas opakovaným vyplňovaním povinných údajov.',
  },
  {
    question: 'Platba za objednaný tovar?',
    answer:
      'Platba je možná online kartou, bankovým prevodom alebo pri osobnom odbere.',
  },
  {
    question: 'Ako postupovať pri reklamácii / výmene tovaru?',
    answer:
      'Reklamácie vybavujeme do 30 dní. Na tovar sa vzťahuje záručná doba 24 mesiacov v zmysle platných právnych predpisov. <br> <strong>Návod pri reklamácii tovaru:</strong><br><ul><li>Tovar aj s kópiou faktúry a sprievodným listom nám zašlite doporučene (nie na dobierku) na adresu:----------------------------------- V sprievodnom liste uveďte meno a priezvisko, na ktoré bola objednávka vytvorená, číslo faktúry (tú nájdete aj vo Vašom konte, ale ak ju neviete nájsť, tak uveďte, kedy ste si u nás objednávku vytvárali a na akú sumu) a dôvod reklamácie.</li><li>Pri výmene tovaru je potrebné si vytvoriť novú objednávku, kde do poznámky v objednávke uvediete, že sa jedná o "reklamáciu tovaru z faktúry číslo ..." (tým si tovar rezervujete a je to pre nás tiež informácia, aby sme Vám objednávku zatiaľ neposielali). Pokiaľ daný tovar nie je k dispozícii, vyberte si iný. Pokiaľ si nechcete vybrať iný tovar, objednávku si nevytvárajte, ale do sprievodného listu uveďte číslo účtu, kde chcete zaslať peniaze za vrátený tovar.</li><li>V prípade ďalších otázok nás neváhajte kontaktovať prostredníctvom emailu.</li></ul>',
  },
  {
    question: 'Aké tlačivo potrebujem pri výmene alebo reklamácii tovaru?',
    answer:
      'Výmena tovaru na stiahnutie tu:............<br>Odstúpenie od kúpnej zmluvy na stiahnutie tu:...............<br>Reklamačný protokol na stiahnutie tu:............',
  },
  {
    question: 'Budete ma informovať o dodaní tovaru pred doručením?',
    answer:
      'Áno. Akonáhle je vaša objednávka spracovaná, odovzdáme zabalenú zásielku prepravcovi. Kuriér Vás bude kontaktovať telefonicky a dohodne si s Vami presný čas doručenia podľa zadanej dodacej adresy.',
  },
  {
    question: 'Ako viem, že som úspešne potvrdil/a objednávku?',
    answer:
      'Ak ste úspešne potvrdili objednávku, príde Vám e-mail s potvrdením objednávky.<br> Ak by Vám e-mail neprišiel, skontrolujte si, či ste dokončili nákup. V nákupnom košíku by Vám nemal zostať žiadny tovar.',
  },
  {
    question: 'Je možné poslať tovar aj do zahraničia?',
    answer:
      'Zaslanie tovaru do zahraničia nie je problém. V procese objednávky táto služba zatiaľ nie je dostupná, no radi Vám vyhovieme individuálne. Pri takejto požiadavke je nutné kontaktovať náš zákaznícky servis, kde kalkuláciu a poslanie balíka radi vyriešime.',
  },
  {
    question:
      'V objednávke som zadal/a platbu bankovým prevodom, ale údaje k platbe mi neprišli. Ako mám postupovať?',
    answer:
      'Údaje k platbe nájdete v e-maile potvrdzujúcom prijatie Vašej objednávky. Číslo účtu pre platbu je....................., ako variabilný symbol uveďte číslo Vašej objednávky. Pokiaľ si nie ste istý/á, aké údaje máte pri platbe zadať, kontaktujte prosím tel.číslo ......',
  },
  {
    question: 'Aká je záručná doba na tovar?',
    answer:
      'Záručná doba na tovar je dva roky od predaja, pokiaľ sa viditeľne od výrobcu neudáva inak???',
  },
  {
    question: 'Čím sú produkty spoločnosti ………….výnimočné?',
    answer: 'predovšetkým prémiovou kvalitou produktov za bezkonkurenčné ceny',
  },
  {
    question: 'Sú produkty Maxima certifikované?',
    answer: 'áno, sú certifikované..................',
  },
  {
    question: 'Kedy mi budú vrátené peniaze za stornovanú objednávku?',
    answer: ' Peniaze Vám budú vrátené najneskôr do 5 pracovných dní.',
  },
];

const KontaktPage = () => (
  <Wrapper>
    <ImgHolder>
      <H1>Kontaktujte nás</H1>
    </ImgHolder>
    <Container>
      <Row>
        <Col md="4" className="mobile-card">
          <Card>
            <Circle>
              <img style={{ width: '24px' }} src="/icons/call.svg" />
            </Circle>
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
              <AnchorLink offset={() => 100} href="#faq">
                <Smooth>Často kladené otázky</Smooth>
              </AnchorLink>
            </div>
          </Card>
        </Col>
        <Col md="4" className="mobile-card">
          <Card>
            <Circle>
              <img style={{ width: '24px' }} src="/icons/reception.svg" />
            </Circle>
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
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Circle>
              <img style={{ width: '24px' }} src="/icons/pin.svg" />
            </Circle>
            <H2 className="w-100">Odberné miesto</H2>
            <div className="mt-4">
              <P>Cestovná agentúra DJK Tour</P>
              <P>064 01 Stará Ľubovňa</P>
              <P>Popradská 6</P>
              <ContactHolder>
                <Span>Email: </Span>
                <A href="mailto:eshop@kupelecks.sk">eshop@kupelecks.sk</A>
              </ContactHolder>
              <ContactHolder>
                <Span>Tel: </Span>
                <A href="tel:+421911338828">+421 911 338 828</A>
              </ContactHolder>
              <ContactHolder>
                <Span>Trasa: </Span>
                <A
                  href="https://maps.google.com/?q=49.301994, 20.688364"
                  target="_blank"
                >
                  Navigácia
                </A>
              </ContactHolder>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <H2
            style={{ borderTop: '1px solid #eaeaea', paddingTop: '32px' }}
            id="faq"
            className="w-100 mt-4 mb-4"
          >
            ČASTO KLADENÉ OTÁZKY
          </H2>
          {faq.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} />
          ))}
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

export default KontaktPage;
