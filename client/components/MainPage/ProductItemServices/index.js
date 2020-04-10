import React from 'react';
import {
  Wrapper, H2, Text, LeftItem, RightItem, Items,
  ItemPhotoLeft, ItemPhotoRight, TextArea, ProductHeader, Gradient, Gradient2, LeftItem2,
  ItemPhotoLeft2, ItemsBottom, RightItem2, ItemPhotoRight2,
} from './styles/productItemServices.style';

const ProductItemServices = ({
  title, about,
}) => (
  <Wrapper>
    <H2>{title}</H2>
    <Text>{about}</Text>
    <Items>
      <Gradient />
      <LeftItem>
        <ItemPhotoLeft imageUrlL="./images/index/sluzby.jpg">
          <TextArea>
            <ProductHeader>Darčekové poukážky</ProductHeader>
            <Text>
              Naše darčekové poukážky prinášajú na prednej strane veľký priestor
              na Vaše venovanie alebo vyznanie. Zároveň predĺžite o kúsok moment prekvapenia,
              keďže obdarovaný si nájde svoj darček (pobyt, procedúry alebo hodnotu)
              až po otvorení darčekovej poukážky.
            </Text>
          </TextArea>
        </ItemPhotoLeft>
      </LeftItem>
      <RightItem>
        <ItemPhotoRight imageUrlR="./images/index/sluzby2.jpg">
          <TextArea>
            <ProductHeader>Permanentky</ProductHeader>
            <Text>
              Tešíme sa z každej Vašej návštevy a preto Vám prinášame extra zľavy
              i procedúry zadarmo. V našej ponuke sa nachádzajú masáže, kúpele,
              terapie a mnohé ďalšie.
            </Text>
          </TextArea>
        </ItemPhotoRight>
      </RightItem>
    </Items>
    <ItemsBottom>
      <Gradient2 />
      <LeftItem2>
        <ItemPhotoLeft2 imageUrl="./images/index/sluzby3.jpg">
          <TextArea>
            <ProductHeader>Lekárske konzultácie a vyšetrenia</ProductHeader>
            <Text>
              Dokonalý oddych je zabezpečený prostredníctvom bohatej ponuky
              procedúr poskytovaných odborným zdravotníckym personálom. Stačí
              si vybrať a užívať dary prírody, moderné prístroje či skúsenosti
              našich odborníkov.
            </Text>
          </TextArea>
        </ItemPhotoLeft2>
      </LeftItem2>
      <RightItem2>
        <ItemPhotoRight2 imageUrl="./images/index/sluzby4.jpg">
          <TextArea>
            <ProductHeader>Liečebné, relaxačné a kozmetické procedúry</ProductHeader>
            <Text>
              Dokonalý oddych je zabezpečený prostredníctvom bohatej ponuky
              procedúr poskytovaných odborným zdravotníckym personálom. Stačí
              si vybrať a užívať dary prírody, moderné prístroje či skúsenosti
              našich odborníkov.
            </Text>
          </TextArea>
        </ItemPhotoRight2>
      </RightItem2>
    </ItemsBottom>
  </Wrapper>
);

export default ProductItemServices;
