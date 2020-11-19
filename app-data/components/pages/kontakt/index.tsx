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
      'Samozrejme, tovar objednaný v našom e-shope si môžete prevziať osobne na predajni Cestovná agentúra DJK Tour, Popradská 6, 064 01 Stará Ľubovňa. ',
  },
  {
    question: 'Je na nákup v e-shope potrebná registrácia?',
    answer:
      'Nie, registrácia v  našom e-shope nie je povinná, no odporúčame ju. Je pre vás pohodlnejšie sa registrovať a ušetriť si čas vyplňovaným všetkých povinných údajov. ',
  },
  {
    question: 'Aké spôsoby platby akceptujete?',
    answer:
      'Platba za zakúpený tovar/službu je možná platobnou kartou, bankovým prevodom alebo na dobierku.',
  },
  {
    question: 'Ako postupovať pri reklamácii / výmene tovaru?',
    answer:
      'Ak sa na vašom zakúpenom tovare vyskytne závada, máte zo zákona právo ju reklamovať. Záručná doba (doba minimálnej spotreby) tovaru je vyznačená na obale. V ostatných prípadoch platí všeobecná záručná doba v dĺžke 24 mesiacov odo dňa prevzatia tovaru. Záruka sa zvyčajne nevzťahuje na mechanické poškodenie, poškodenie prírodným živlom a podobne.<br> Zásielku s reklamovaným tovarom odporúčame posielať ako poistený balík (nie na dobierku), spolu s kópiou daňového dokladu (paragón, faktúra). Nezabudnite priložiť Výmenný/reklamačný protokol, kde čo najpodrobnejšie popíšete závadu a dôvody reklamácie. Balíček s tovarom nám odošlite na adresu: MICUS RELAX, s.r.o., so sídlom Popradská 6, 064 01 Stará Ľubovňa, Slovenská republika.',
  },
  {
    question: 'Ako viem, že som úspešne potvrdil/a objednávku?',
    answer:
      'Ak ste úspešne potvrdili objednávku, príde Vám e-mail s potvrdením objednávky. V prípade, že ste nedostali žiadny e-mail, skontrolujte, či ste dokončili nákup. V nákupnom košíku by vám nemal zostať žiadny tovar. ',
  },
  {
    question: 'Je možné poslať tovar aj do zahraničia?',
    answer:
      'Zaslanie tovaru do zahraničia nie je problém. V procese objednávky táto služba nie je dostupná, no radi vám vyhovieme individuálne. Kontaktujte nás, kde kalkuláciu poštovného a poslanie balíka radi vyriešime.',
  },
  {
    question:
      'V objednávke som zadal/a platbu bankovým prevodom, ale údaje k platbe mi neprišli. Ako mám postupovať?',
    answer:
      'Údaje k platbe nájdete v e-maile potvrdzujúcom prijatie Vašej objednávky. Číslo účtu pre platbu je....................., ako variabilný symbol uveďte číslo Vašej objednávky. Pokiaľ si nie ste istý/á, aké údaje máte pri platbe zadať, kontaktujte prosím tel.číslo ......',
  },
  {
    question: 'Kedy bude moja reklamácia vybavená? ',
    answer:
      'Budeme sa snažiť, aby to bolo v čo najkratšom čase, najneskôr však do 30 dní od uplatnenia reklamácie a prijatia reklamovaného tovaru. O výsledku reklamácie budete informovaný e-mailom alebo telefonicky a spolu s tovarom Vám bude doručený reklamačný protokol s vyrozumením.',
  },
  {
    question:
      'V zásielke mi neprišiel správny tovar alebo v nej niečo chýba. Ako postupovať?',
    answer:
      'Za nepríjemnosť sa vám ospravedlňujeme. Pokiaľ vo vašej zásielke dorazil iný tovar, ako ste si objednali, kontaktujte nás e-mailom: eshop@kupelecks.sk alebo telefonicky + 421 911 904 880 v pracovných dňoch od 08:00 do 17:00 hod. A my vám zašleme už ten správny.',
  },
  {
    question: 'Je možné tovar vymeniť?',
    answer:
      'V prípade záujmu o výmeu tovaru vám odporúčame tovar vrátiť, vypísať Výmenný reklamačný formulár  a vytvoriť novú objednávku.',
  },
  {
    question: 'Je možné tovar/službu vrátiť?',
    answer:
      'Zakúpený tovar alebo službu máte právo vrátiť alebo vymeniť do 14 dní. Balíček nám jednoducho odošlite poštou na adresu:  AMICUS RELAX, s.r.o., Popradská 6, 064 01 Stará Ľubovňa. Chceme vás upozorniť, že tovar musí byť nepoužitý, nepoškodený a v originálnom balení.<br> Do zásielky priložte vyplnený a podpísaný Formulár na odstpúenie od zmluvy, ktorý je vám k dispozícii tu. Vo formulári uveďte tovar, ktorý chcete vrátiť a číslo účtu (IBAN), kam máme finančné prostriedky vrátiť. Akonáhle tieto údaje od vás dostaneme, financie Vám vrátime čo najskôr, najneskôr však do 14 kalendárnych dní. <br> Odporúčame vám zásielku poslať ako doporučený balík s poistením na hodnotu tovaru (v prípade straty, alebo znehodnotenia balíka si ho budete môcť s podacím lístkom na pošte vyreklamovať).',
  },
  {
    question: 'Aký je stav mojej objednávky?',
    answer:
      'O stave vašej objednávky vás v každom kroku budeme informovať e-mailom. Dostanete potvrdenie o prijatí objednávky, o jej vyskladnení a napokon aj o odoslaní. V prípade registrovaných zákazníkov si viete stav Vašej objednávky sledovať vo Vašom účte.',
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
