import React from 'react';
import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../app-data/lib/state/Reducer';
import {
  Wrapper,
  H1,
  P,
  H2,
  LI,
} from '../../app-data/shared/styles/components/Documents';
import { Container } from 'reactstrap';

const CookiesPolicy: () => JSX.Element = () => (
  <Layout>
    <Wrapper>
      <Container>
        <H1>Zásady používania súborov cookies</H1>
        <P>
          Tieto zásady používania súborov cookies sa vzťahujú na webovú stránku
          www.eshop.kupelecks.sk, ktorá je prevádzkovaná spoločnosťou AMICUS
          RELAX, s.r.o., so sídlom Popradská 6, 064 01 Stará Ľubovňa, IČO: 36
          849 987, registrovaná v Obchodnom registri vedenom Okresným súdom
          Prešov, odd. Sro, vložka č. 19260/P (ďalej len „cookies“). Tieto
          zásady môžu byť priebežne aktualizované a zmenené aj bez upozornenia.{' '}
        </P>
        <H2>Čo sú cookies?</H2>
        <P>
          Cookies sú malé textové súbory, ktoré sú uložené vo webovom
          prehliadači používateľa (napr. Internet Explorer, Google Chrome,
          Firefox) v jeho počítači, smartfóne, tablete alebo inom zariadení,
          ktoré používate na prístup na internet. Sú vytvorené na to, aby webová
          stránka, ktorú navštívite, rozoznala vaše koncové zariadenie alebo aby
          vám pomáhali a umožnili efektívne používať webové stránky, ich funkcie
          a nastavenia. Súbory cookies si pamätajú typ používaného prehliadača
          alebo zvolené nastavenia, ktoré zostávajú Vašimi predvolenými
          nastaveniami pri opakovanej návšteve webovej stránky zlepšujúcimi Váš
          užívateľský komfort.
        </P>
        <P>
          Podľa § 55 ods. 5 zákona č. 351/2011 Z. z. o elektronických
          komunikáciách, v znení neskorších predpisov, si Vás týmto dovoľujeme
          informovať o používaní cookies a na možnosť zmeny nastavenia vášho
          prehliadača pre prípad, že vám aktuálne nastavenie využívania cookies
          nevyhovuje. Vaše aktuálne nastavenia webového prehliadača preto budeme
          považovať za súhlas s ukladaním cookies v určenom rozsahu.
        </P>
        <H2>Na čo používame cookies?</H2>
        <P>
          Cookies používame predovšetkým na to, aby sme vám zabezpečili čo
          najlepší zážitok pri prezeraní našich webových stránok. Cookies, ktoré
          požívame vám umožňujú prihlásenie do našich webových stránok, umožňujú
          nám zapamätať si a zachovať vaše preferencie ohľadom prehliadania
          našich webových stránok, ako napríklad nastavenie jazyka, automatické
          zobrazenie poslednej prehliadanej stránky pri ďalšej návšteve a na to,
          aby sme vám predstavili taký obsah našich stránok, o ktorom
          predpokladáme, že by pre Vás mohol byť zaujímavý. Cookies používame aj
          na štatistické a analytické účely, na vyhodnotenie používania našich
          webových stránok a umožňujú nám tak vylepšovať naše webové stránky pre
          všetkých používateľov. Pomáhajú nám určiť, čo naši užívatelia
          preferujú a naopak, čo sa im nepáči. Ak nájdete na našich stránkach
          linky na iné internetové stránky, prosím nezabudnite, že tieto majú
          vlastný spôsob, rozsah a typ cookies, ktoré používajú, a ktoré budú
          spracúvať všetky údaje, ktoré na týchto stránkach poskytnete.
          Odporúčame vám, aby ste si prečítali a nastavili cookies na týchto
          webových stránkach pred tým, než si ich začnete prehliadať, prípadne
          ich prevádzkovateľom poskytnete akékoľvek údaje. Súbory cookies, ktoré
          používame, nepoškodzujú Váš počítač alebo iné zariadenie,
          prostredníctvom, ktorého si naše webové stránky prehliadate.
        </P>
        <H2>Ako spolupracujeme s tretími stranami?</H2>
        <P>
          Tretie strany sú naši partneri, ktorým dôverujeme. Zahŕňajú partnerov,
          ktorí pre nás zabezpečujú potrebné funkcionality a vylepšenia webových
          stránok a ich vývoj, alebo ktorí nám poskytujú štatistiky napríklad o
          najnavštevovanejších stránkach. Na vyhodnocovanie štatistík môžeme o
          vás zhromažďovať údaje o vašom pripojení a počítači (napr. IP adresu,
          typ a nastavenie prehliadača, operačný systém). Takéto údaje sa však
          nekombinujú s inými osobnými údajmi o vašej osobe. Nepoužívame cookies
          na poskytovanie vašich osobných údajov tretím stranám. Vaše údaje v
          rozsahu meno, priezvisko, adresa, telefónny alebo emailový kontakt
          poskytneme tretej strane len vtedy, ak nám na to dáte súhlas alebo je
          to potrebné pre poskytovanie našich služieb.
        </P>
        <H2>Ako môžem súbory cookies kontrolovať alebo vymazať?</H2>
        <P>
          Väčšina prehliadačov prijíma súbory cookies automaticky. Ak súbory
          cookies nechcete používať, budete ich musieť aktívne odstrániť alebo
          zablokovať. Ak odmietnete používanie súborov cookies, budete stále
          schopní navštíviť naše webové stránky, ale niektoré funkcie nemusia
          správne fungovať. Pokiaľ si tak prajete urobiť, môžete zvoliť možnosť
          odmietnuť či blokovať súbory cookies zmenou nastavenia Vášho
          internetového prehliadača. Pre viac informácii využite nápovedu Vášho
          internetového prehliadača.{' '}
        </P>
        <P className="mt-4">
          Táto verzia zásad používania súborov cookies bola vydaná dňa
          02.08.2020
        </P>
      </Container>
    </Wrapper>
  </Layout>
);

export default withSetCart(CookiesPolicy);
