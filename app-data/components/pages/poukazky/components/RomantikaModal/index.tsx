import React from 'react';
import {
  Head, Divider, TableContent, TableItem, TableText, UL, LI, NormalText,
} from '../../styles/modalStyle'

const RomantikaModal: () => JSX.Element = () => (
  <div>
    <Head>
      Doprajte sebe a svojej milovanej polovičke romantický pobyt
      v kúpeľoch. Či sa len spoznávate alebo tvoríte pár už dlhé roky,
      pobyt v našich kúpeľoch umocní vo Vašom vzťahu potrebu vzájomnej
      náklonnosti. Nezabudnuteľné zážitky Vám obohatíme romantickou večerou
      pri sviečkach a fľaši sektu, spoločným relaxom a špeciálne pripravenou izbou.
    </Head>
    <Divider />
    <TableContent>
      <TableItem>UBYTOVANIE:</TableItem>
      <TableText>DOM ZDRAVIA</TableText>
    </TableContent>
    <Divider />
    <TableContent>
      <TableItem>CENA ZA POBYT PRE 2 OSOBY:</TableItem>
      <TableText>298,00 €</TableText>
    </TableContent>
    <Divider />
    <TableItem>V CENE POBYTU NA 2 NOCI PRE 2 OSOBY JE ZAHRNUTÉ:</TableItem>
    <UL>
      <LI>ubytovanie s raňajkami a večerou</LI>
      <LI>2x bylinný vaňový kúpeľ celkový</LI>
      <LI>2x čiastočná masáž</LI>
      <LI>
        1x spoločné saunovanie (na výber z fínskej sauny alebo infrasauny)
      </LI>
    </UL>
    <Divider />
    <NormalText>
      Miestna daň za ubytovanie 0,70 € za osobu/noc nie je zahrnutá
      v cene pobytu a platí sa na mieste.
    </NormalText>
    <TableItem>Bonus</TableItem>
    <UL>
      <LI>1x romantická večera (v rámci jednej z večerí)</LI>
      <LI>fľaša sektu</LI>
      <LI>výzdoba izby</LI>
      <LI>
        Možnosť využiť izbu v deň odchodu až do 14.00 hod
      </LI>
      <LI>
        Zapožičanie športových potrieb na našich športoviskách a voľnočasových aktivitách,
        ako aj využívanie vonkajšieho bazéna s protiprúdom ZADARMO (v prípade priaznivých
        poveternostných podmienok). U nás si môžete zahrať bedminton, petang, veľký šach,
        ruské kuželky, volejbal či futbal.
      </LI>
      <LI>
        WiFi pripojenie a parkovanie v areáli ZADARMO.
      </LI>
    </UL>
    <NormalText>
      Pobyt je v platnosti celoročne, okrem termínov kedy sú v ponuke Veľkonočné
      a Silvestrovské pobyty.
    </NormalText>
  </div>
);

export default RomantikaModal;