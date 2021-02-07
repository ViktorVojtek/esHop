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
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';
import { useRouter } from 'next/router';
import { ActionButton } from '../FeatureProduct/styles';
import { RibbonHolder } from '../Ribbon/RibbonHolder';
import { DiscountRibbon } from '../Ribbon/DiscountRibbon';
import { NewProductRibbon } from '../Ribbon/NewProductRibbon';
import { ProductsSkeleton } from '../../../components/pages/eshop/components/Products/components/ProductsSkeleton';
import { SUBCATEGORIES_QUERY } from '../../../graphql/query';
import { SubCategoryType } from '../../../components/pages/admin/settings/subcategory';

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
  product: { _id, variants, subCategory, title, slug },
  subCategoriesList,
}) => {
  const router = useRouter();
  const [subCategoryObject] = subCategoriesList.filter(
    (item) => item._id === subCategory.id
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
        title === variants[0].title ? title : `${title}, ${variants[0].title}`,
      price: getPrice(variants[0]),
      count: 1,
      type: 'product',
      id: _id,
      variantTitle: variants[0].title,
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
    <Col lg="3" md="6" sm="12" className="mb-4" key={_id}>
      <ProductItem elevation={2}>
        <div className="w-100">
          <ImageWrap>
            {variants[0].images.length > 0 ? (
              <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
                <a>
                  <div className="product-image">
                    <ProductImg
                      url={variants[0].images[0].path}
                      className="product-image-background"
                    />
                    <div className="detail">
                      <EyeDetail />
                    </div>
                  </div>
                </a>
              </Link>
            ) : null}
          </ImageWrap>{' '}
          <ProductBody>
            <PriceHolder>
              {variants[0].discount > 0 ? (
                <Price>
                  <Del>
                    {formatPrice(variants[0].price.value)}{' '}
                    {variants[0].price.currency}
                  </Del>
                  <ActionPrice className="ml-2">
                    {formatPrice(
                      variants[0].price.value -
                        (variants[0].price.value * variants[0].discount) / 100
                    )}{' '}
                    {variants[0].price.currency}
                  </ActionPrice>
                </Price>
              ) : (
                <Price>
                  {formatPrice(variants[0].price.value)}{' '}
                  {variants[0].price.currency}
                </Price>
              )}
            </PriceHolder>
            <ProductTitle slug={slug} title={title} />
            <StyledShortDescription>{subCategory.title}</StyledShortDescription>
          </ProductBody>
        </div>
        <ActionHolder>
          <ActionIconsHolder>
            {subCategoryObject.forGiftCard && (
              <StyledCardGiftcardOutlinedIcon
                onClick={handleAddProductToGiftCard}
              />
            )}
          </ActionIconsHolder>
          {subCategoryObject.forSale ? (
            <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
              <ActionButton>Vložiť do košíka</ActionButton>
            </Link>
          ) : (
            <>
              <Link
                href={{ pathname: `/rezervacia`, query: { service: title } }}
              >
                <ActionButton>Rezervovať</ActionButton>
              </Link>
            </>
          )}
        </ActionHolder>
        <RibbonHolder>
          {variants[0].discount > 0 && (
            <DiscountRibbon text={`ZĽAVA ${variants[0].discount} %`} />
          )}
          <NewProductRibbon text="Novinka" />
        </RibbonHolder>
      </ProductItem>
    </Col>
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
