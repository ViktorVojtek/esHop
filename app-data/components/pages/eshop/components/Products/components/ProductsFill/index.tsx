import React from 'react';
import Link from 'next/link';
import { Col } from 'reactstrap';
import { useIsClient } from '../../../../../../../lib/util/app.util';

// Styled Components
import {
  ImageWrap,
  PriceHolder,
  Price,
  ProductImg,
  ProductItem,
  ProductBody,
  StyledProductTitle,
  StyledShortDescription,
  EyeDetail,
  ActionPrice,
  Del,
} from './styles/products.style';

// type Product
import Product from '../../../../../../../shared/types/Product.types';
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from './types/ProductFill.types';
import ServiceUI from '../ServicesFill';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
import { DiscountRibbon } from '../../../../../../../shared/components/Ribbon/DiscountRibbon';
import { RibbonHolder } from '../../../../../../../shared/components/Ribbon/RibbonHolder';
import { ProductButton } from '../../../../../../../shared/design';
import { BonusRibbon } from '../../../../../../../shared/components/Ribbon/BonusRibbon';

const ProductTitle: React.FC<IProductTitle> = ({ id, title }) => (
  <Link href={{ pathname: '/eshop/product', query: { id } }}>
    <a>
      <StyledProductTitle>{title}</StyledProductTitle>
    </a>
  </Link>
);

const ProductUI: React.FC<IProductUI> = ({
  product: { _id, variants, subCategory, title, isEnvelopeSize, slug },
  addProduct,
  toggleModal,
}) => {
  const isClient = useIsClient();
  const handleAddProductToCart = () => {
    const {
      default: variantDefault,
      itemsInStock,
      ...restVariantData
    } = variants[0];

    addProduct({
      id: _id,
      variants: { ...restVariantData, count: 1 },
      isEnvelopeSize: isEnvelopeSize,
      title: title,
    });
    toggleModal();
  };

  return (
    <Col lg="3" sm="6" key={_id}>
      <ProductItem>
        <div>
          <ImageWrap>
            {variants[0].images.length > 0 ? (
              <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
                <a>
                  <div className="product-image">
                    <ProductImg
                      src={variants[0].images[0].path}
                      alt={variants[0].title}
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
            <ProductTitle id={_id} title={title} />
            <StyledShortDescription>{subCategory.title}</StyledShortDescription>
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
          </ProductBody>
        </div>
        {variants.length > 1 ? (
          <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
            <ProductButton>Vložiť do košíka</ProductButton>
          </Link>
        ) : (
          <ProductButton
            type="button"
            onClick={() => (isClient ? handleAddProductToCart() : null)}
          >
            Vložiť do košíka
          </ProductButton>
        )}
        <RibbonHolder>
          {variants[0].discount > 0 && (
            <DiscountRibbon text={`ZĽAVA ${variants[0].discount} %`} />
          )}
          {variants[0].bonus && <BonusRibbon text={`Darček`} />}
        </RibbonHolder>
      </ProductItem>
    </Col>
  );
};
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
  toggleModal,
}) => {
  const elements: JSX.Element[] = products.map((item: any) => {
    const { _id, variants } = item;
    return (
      <React.Fragment key={_id}>
        {variants !== undefined ? (
          <ProductUI
            toggleModal={toggleModal}
            product={item}
            addProduct={addProduct}
          />
        ) : (
          <ServiceUI product={item} />
        )}
      </React.Fragment>
    );
  });

  return <>{elements}</>;
};

export default ProductsFill;
