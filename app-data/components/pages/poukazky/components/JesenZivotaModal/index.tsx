import React from 'react';
import {
  Head, Divider, TableContent, TableItem, TableText, UL, LI, NormalText,
} from '../../styles/modalStyle'

const JesenZivotaModal: () => JSX.Element = () => (
  <div>
    <Head>
      Načerpajte čerstvé sily a elán do života pobytom v našich kúpeľoch.
      Využite jedinečnú voľnosť vybrať si z našich liečebných a relaxačných
      procedúr, pri ktorých si dokonale oddýchnete a zabudnete na každodenné starosti.
    </Head>
    <Divider />
    <TableContent>
      <TableItem>UBYTOVANIE:</TableItem>
      <TableText>DOM ZDRAVIA</TableText>
    </TableContent>
    <Divider />
    <TableContent>
      <TableItem>CENA ZA POBYT PRE 1 OSOBU:</TableItem>
      <TableText>285,00 €</TableText>
    </TableContent>
    <Divider />
    <TableItem>V CENE POBYTU NA 5 NOCÍ PRE 1 OSOBU JE ZAHRNUTÉ:</TableItem>
    <UL>
      <LI>ubytovanie s raňajkami, obedom a večerou</LI>
      <LI>5x procedúra podľa vlastného výberu (z liečebných a relaxačných procedúr)</LI>
    </UL>
    <Divider />
    <NormalText>
      Cena platí pri obsadenosti izby dvoma osobami. Doplatok za neobsadenie druhého lôžka je 10 €/noc.
    </NormalText>
    <NormalText>
      Miestna daň za ubytovanie 0,70 € za osobu/noc nie je zahrnutá v cene pobytu a platí sa na mieste.
    </NormalText>
    <TableItem>Bonus</TableItem>
    <UL>
      <LI>Zapožičanie palíc na Nordic Walking.</LI>
      <LI>
        Zapožičanie športových potrieb na našich športoviskách a voľnočasových aktivitách,
        ako aj využívanie vonkajšieho bazéna s protiprúdom ZADARMO (v prípade priaznivých
        poveternostných podmienok). U nás si môžete zahrať bedminton, petang, veľký šach,
        ruské kuželky, volejbal či futbal.
      </LI>
      <LI>
        V prípade záujmu individuálna konzultácia o možnostiach voľnočasového programu klienta a tipoch na výlety do okolia.
      </LI>
      <LI>WiFi pripojenie a parkovanie v areáli ZADARMO.</LI>
    </UL>
    <NormalText>
      Pobyt je určený pre klientov nad 55 rokov a držiteľov ŤZP preukazu.
    </NormalText>
    <NormalText>
      Pobyt je v platnosti celoročne, okrem mesiacov jún, júl, august a termínov kedy sú v ponuke Veľkonočné a Silvestrovské pobyty.
    </NormalText>
  </div>
);

export default JesenZivotaModal;