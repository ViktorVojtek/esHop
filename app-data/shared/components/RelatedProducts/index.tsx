import React, { FC } from 'react';

import { Col, Row } from 'reactstrap';
import Link from 'next/link';
import Product from '../../../shared/types/Product.types';

import {
  ProductItem,
  ImageWrap,
  ProductImg,
  EyeDetail,
  ProductBody,
  StyledShortDescription,
  StyledProductTitle,
  PriceHolder,
  Price,
  ActionPrice,
  StyledCardGiftcardOutlinedIcon,
  ActionHolder,
  ActionIconsHolder,
} from './styles/index';
import { Del } from '../../../components/pages/eshop/components/Products/components/ProductsFill/styles/products.style';
import { formatPrice } from '../../helpers/formatters';
import { IProductTitle } from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';
import { useRouter } from 'next/router';
import { ActionButton } from '../FeatureProduct/styles';
import { RibbonHolder } from '../Ribbon/RibbonHolder';
import { DiscountRibbon } from '../Ribbon/DiscountRibbon';
import { SubCategoryType } from '../../../components/pages/admin/settings/subcategory';
import { BonusRibbon } from '../Ribbon/BonusRibbon';
import { CovidRibbon } from '../Ribbon/CovidRibbon';
import { ProductUI } from '../Product';
import { StyledCol } from '../Product/style';

const ProductTitle: React.FC<IProductTitle> = ({ slug, title }) => {
  return (
    <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
      <a>
        <StyledProductTitle>{title}</StyledProductTitle>
      </a>
    </Link>
  );
};
type IRelatedProducts = {
  product: Product;
  subCategoriesList: SubCategoryType[];
};

const RelatedProducts: FC<IRelatedProducts> = ({
  product,
  subCategoriesList,
}) => {
  const router = useRouter();
  const [subCategoryObject] = subCategoriesList.filter(
    (item) => item._id === product.subCategory.id
  );

  function getPrice(variant): number {
    if (variant.discount > 0) {
      return (
        variant.price.value - (variant.price.value * variant.discount) / 100
      );
    } else return variant.price.value;
  }

  function handleAddProductToGiftCard() {
    const giftCard = {
      title:
        product.title === product.variants[0].title
          ? product.title
          : `${product.title}, ${product.variants[0].title}`,
      price: getPrice(product.variants[0]),
      count: 1,
      type: 'product',
      id: product._id,
      variantTitle: product.variants[0].title,
      variantNumber: 0,
    };
    let storedGiftCard = JSON.parse(window.localStorage.getItem('giftCard'));
    if (storedGiftCard) {
      const sameArray = storedGiftCard.services.filter(
        (item) => item.title === giftCard.title
      );
      const diffArray = storedGiftCard.services.filter(
        (item) => item.title !== giftCard.title
      );
      if (sameArray.length > 0) {
        let mergeCount = Number(giftCard.count) + Number(sameArray[0].count);
        giftCard.count = mergeCount;
      }
      giftCard.type = 'produkt';
      const newArray = [...diffArray, giftCard];
      storedGiftCard = {
        ...storedGiftCard,
        services: newArray,
      };
      window.localStorage.setItem('giftCard', JSON.stringify(storedGiftCard));
    } else {
      storedGiftCard = {
        giftCardTitle: '',
        giftCardImageUrl: '',
        priceValue: 0,
        text: '',
        services: [giftCard],
        totalPrice: 0,
      };
      window.localStorage.setItem('giftCard', JSON.stringify(storedGiftCard));
    }

    router.push('/darcekove-poukazky');
  }
  return (
    <StyledCol lg={3} md={6} sm={12}>
      <ProductUI
        product={product}
        subCategoryObject={subCategoryObject}
        addProduct={null}
        addProductToGiftCard={handleAddProductToGiftCard}
      />
    </StyledCol>
  );
};
type IRelatedProductsFill = {
  products: Product[];
  subCategories: SubCategoryType[];
};
const RelatedProductsFill: React.FC<IRelatedProductsFill> = ({
  products,
  subCategories,
}) => {
  const elements: JSX.Element[] = products.slice(0, 4).map((item: Product) => {
    const { _id } = item;

    return (
      <RelatedProducts
        subCategoriesList={subCategories}
        product={item}
        key={_id}
      />
    );
  });

  return <Row>{elements}</Row>;
};

export default RelatedProductsFill;
