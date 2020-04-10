import React from 'react';
import ProductItemMP from '../ProductItemMP';
import ProductItemServices from '../ProductItemServices';
import ProductItemStay from '../ProductItemStay';
import { Container } from 'reactstrap';

const ProductsMP = () => (
  <Container fluid>
    <ProductItemMP
      imageUrlL="./images/index/products.jpg"
      imageUrlR="./images/index/products2.jpg"
      gradient1
      width="70"
      height="70"
      top="13"
      right="-115"
      title="Produkty"
      about="Vyskúšajte jedinečné produkty jedného z najstarších a tradičných výrobcov wellness kozmetiky na Slovensku."
      headerLeft="Kúpeľnictvo a kozmetika"
      textLeft="Vyskúšajte jedinečné produkty jedného z najstarších a tradičných výrobcov wellness
      kozmetiky na Slovensku. Štyri generácie rodiny píšu tento príbeh a uchovávajú receptúry a tradície
      výroby i regiónu. Spoločnosť EZO.sk kladie veľký dôraz na kvalitu výrobkov, ktoré sú vyrábané ručne s
      použitím prvotriednych tradičných prírodných surovín, pričom dbá na tisícročné princípy
      aromaterapie. Doprajte si s EZO produktami Vaše domáce kúpele."
      headerRight="Jedinečné suveníry"
      textRight="Prineste si hmotnú spomienku z Pienin či kúpeľov a pripomeňte si zážitky z Vašej cesty alebo podarujte niektorú zo sladkých maškŕt svojim blízkym. Ak ste u nás ešte neboli, nech Vám suvenír poslúži ako začiatok Vašej cesty k nám."
    />
    <ProductItemServices
      title="Služby"
      about="Vyskúšajte jedinečné produkty jedného z najstarších a tradičných výrobcov wellness kozmetiky na Slovensku."
    />
    <ProductItemStay
      title="Pobyty"
      about="Využite lukratívnu ponuku zvýhodnených pobytov. Tešíme sa na stretnutie s Vami."
    />
  </Container>
);

export default ProductsMP;
