import React, { useState } from 'react';
import {
  Wrapper, H2, Text, LeftItem, RightItem, Items, Button, ButtonsHolder,
  ItemPhotoRight, TextArea, ProductHeader, Gradient, Text2,
} from './styles';

const stays = [
  {
    url: './images/index/pobyt1.jpg',
    header: 'Romantika',
    text: 'Doprajte sebe a svojej milovanej polovičke romantický pobyt v kúpeľoch. Či sa len spoznávate alebo tvoríte pár už dlhé roky, pobyt v našich kúpeľoch umocní vo Vašom vzťahu potrebu vzájomnej náklonnosti. Nezabudnuteľné zážitky Vám obohatíme romantickou večerou pri sviečkach a fľaši sektu, spoločným relaxom a špeciálne pripravenou izbou.',
  },
  {
    url: './images/index/pobyt2.jpg',
    header: 'Jesen života',
    text: 'Načerpajte čerstvé sily a elán do života pobytom v našich kúpeľoch. Využite jedinečnú voľnosť vybrať si z našich liečebných a relaxačných procedúr, pri ktorých si dokonale oddýchnete a zabudnete na každodenné starosti.',
  },
  {
    url: './images/index/pobyt3.jpg',
    header: 'Čaro pienin',
    text: 'Zavítajte k nám a doprajte si dokonalý oddych v objatí Pienin. Prijmite dary prírody, ktoré liečia a nadýchajte sa čerstvého vzduchu. Svoje sily zregenerujete využitím procedúr, počas prechádzok alebo aktívnym pohybom pri voľnočasových aktivitách v areáli či kúpeľnom parku.',
  },
  {
    url: './images/index/pobyt4.jpg',
    header: 'Rodinná idylka',
    text: 'Povenujte sa svojej drahej polovičke alebo rodine a zažite tú pravú rodinnú idylku. Areál kúpeľov i Pieniny ponúkajú mnoho aktivít a výletov, po ktorých padnú určite vhod liečebné a relaxačné procedúry.',
  },
  {
    url: './images/index/pobyt5.jpg',
    header: 'Hrejivá zima',
    text: 'Zahrejte sa vďaka bohatej nádielke liečebných a relaxačných procedúr, pri ktorých sa skutočne uvoľníte. Príjemne hrejivý pocit v kúpeľoch sa znásobí po prechádzke na čerstvom vzduchu zimnou krajinou najmenšieho národného parku na Slovensku.',
  },
  {
    url: './images/index/pobyt6.jpg',
    header: 'Silvester s rodinou',
    text: 'Užite si posledné chvíle starého roka 2019 a privítajte Nový rok v KÚPEĽOCH ČERVENÝ KLÁŠTOR Smerdžonka s celou rodinou či známymi. Okúste čarokrásne Pieniny pri pobyte u nás.',
  },
];

const ProductItemStay = ({
  title, about,
}) => {
  const [actualStay, setActualStay] = useState(stays[0]);

  const changeStay = (value) => {
    setActualStay(stays[value]);
  };

  return (
    <Wrapper>
      <H2>{title}</H2>
      <Text>{about}</Text>
      <Items>
        <Gradient />
        <LeftItem>
          <ButtonsHolder>
            <Button type="button" onClick={() => changeStay(0)}>Romantika</Button>
            <Button type="button" onClick={() => changeStay(1)}>Jeseň života</Button>
            <Button type="button" onClick={() => changeStay(2)}>Čaro pienin</Button>
            <Button type="button" onClick={() => changeStay(3)}>Rodinná idylka</Button>
            <Button type="button" onClick={() => changeStay(4)}>Hrejivá zima</Button>
            <Button type="button" onClick={() => changeStay(5)}>Silvester s rodinou</Button>
          </ButtonsHolder>
        </LeftItem>
        <RightItem>
          <ItemPhotoRight imageUrl={actualStay.url}>
            <TextArea className="stay-item">
              <ProductHeader>{actualStay.header}</ProductHeader>
              <Text2>{actualStay.text}</Text2>
            </TextArea>
          </ItemPhotoRight>
        </RightItem>
      </Items>
    </Wrapper>
  );
};

export default ProductItemStay;