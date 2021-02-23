import React, { FC } from 'react';

import { Col } from 'reactstrap';
import Link from 'next/link';

import {
  IProductUI,
  IProductsFillProps,
  IProductTitle,
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';
import Product from '../../../shared/types/Product.types';

import {
  ProductItem,
  ImageWrap,
  ProductImg,
  EyeDetail,
  ProductBody,
  StyledShortDescription,
  PriceHolder,
  Price,
  Del,
  ActionPrice,
  ActionButton,
  ActionHolder,
  StyledCardGiftcardOutlinedIcon,
  ActionIconsHolder,
} from './styles/index';
import { formatPrice } from '../../helpers/formatters';
import { DiscountRibbon } from '../Ribbon/DiscountRibbon';
import { RibbonHolder } from '../Ribbon/RibbonHolder';
import { ProductsSkeleton } from '../../../components/pages/eshop/components/Products/components/ProductsSkeleton';
import { useQuery } from 'react-apollo';
import { SUBCATEGORIES_QUERY } from '../../../graphql/query';
import { StyledProductTitle } from '../../../components/pages/eshop/components/Products/components/ProductsFill/styles/products.style';
import { useRouter } from 'next/router';
import { BonusRibbon } from '../Ribbon/BonusRibbon';
import { CovidRibbon } from '../Ribbon/CovidRibbon';

const ProductTitle: React.FC<IProductTitle> = ({ slug, title }) => {
  return (
    <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
      <a>
        <StyledProductTitle>{title}</StyledProductTitle>
      </a>
    </Link>
  );
};

const FeatureProduct: FC<IProductUI> = ({
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
    <Col lg="3" sm="6" xs="12" className="mb-4" key={_id}>
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
            <DiscountRibbon
              text={`ZĽAVA ${Math.round(variants[0].discount)} %`}
            />
          )}
          {variants[0].bonus && <BonusRibbon text={`+Bonus`} />}
          {subCategoryObject.covidWarranty && (
            <CovidRibbon text="Covid-19 garancia" />
          )}
        </RibbonHolder>
      </ProductItem>
    </Col>
  );
};
const FeaturecProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const { data, loading, error } = useQuery(SUBCATEGORIES_QUERY, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <ProductsSkeleton />;
  }
  const { subCategories } = data;
  const elements: JSX.Element[] = products.slice(0, 8).map((item: Product) => {
    const { _id } = item;

    return (
      <FeatureProduct
        subCategoriesList={subCategories}
        product={item}
        addProduct={addProduct}
        key={_id}
      />
    );
  });

  return <>{elements}</>;
};

export default FeaturecProductsFill;
