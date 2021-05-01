import React, { FC, useState } from 'react';
import Link from 'next/link';

import { IProductTitle } from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';
import Product from '../../../shared/types/Product.types';

import { formatPrice } from '../../helpers/formatters';
import { DiscountRibbon } from '../Ribbon/DiscountRibbon';
import { RibbonHolder } from '../Ribbon/RibbonHolder';
import { StyledProductTitle } from '../../../components/pages/eshop/components/Products/components/ProductsFill/styles/products.style';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { BonusRibbon } from '../Ribbon/BonusRibbon';
import { CovidRibbon } from '../Ribbon/CovidRibbon';
import {
  ProductBody,
  ProductImg,
  ProductItem,
  Price,
  PriceHolder,
  ActionButton,
  ActionHolder,
  ActionPrice,
  Del,
  ImageWrap,
  EyeDetail,
  StyledShortDescription,
  GiftCardButton,
  ModalImage,
  ModalProductInfo,
  ModalText,
  ModalTextSmall,
  ModalTitle,
  StyledModalBody,
  StyledShoppingCartIcon,
} from './style';
import { useIsClient } from '../../../lib/util/app.util';
import { Button, SecondaryButton } from '../../design';

const ProductTitle: React.FC<IProductTitle> = ({ slug, title }) => {
  return (
    <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
      <a>
        <StyledProductTitle>{title}</StyledProductTitle>
      </a>
    </Link>
  );
};

type ProductType = {
  product: Product;
  subCategoryObject: any;
  addProduct: () => void;
  addProductToGiftCard: () => void;
  toggleModal?: () => void;
  modal?: boolean;
};

export const ProductUI: FC<ProductType> = ({
  product: { _id, variants, subCategory, title, slug },
  subCategoryObject,
  addProductToGiftCard,
  addProduct,
  toggleModal,
  modal,
}) => {
  const isClient = useIsClient();
  return (
    <>
      <ProductItem elevation={0}>
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
                      <EyeDetail src="/icons/eye.svg" />
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
                  <ActionPrice>
                    {formatPrice(variants[0].price.value)}{' '}
                    {variants[0].price.currency}
                  </ActionPrice>
                </Price>
              )}
            </PriceHolder>
            <ProductTitle slug={slug} title={title} />
            <StyledShortDescription>{subCategory.title}</StyledShortDescription>
          </ProductBody>
        </div>
        <ActionHolder>
          {subCategoryObject.forSale ? (
            <>
              {variants.length > 1 || addProduct === null ? (
                <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
                  <ActionButton>Vložiť do košíka</ActionButton>
                </Link>
              ) : (
                <ActionButton
                  type="button"
                  onClick={() => (isClient ? addProduct() : null)}
                >
                  Vložiť do košíka
                </ActionButton>
              )}
            </>
          ) : (
            <>
              <Link
                href={{ pathname: `/rezervacia`, query: { service: title } }}
              >
                <ActionButton>Rezervovať</ActionButton>
              </Link>
            </>
          )}
          {subCategoryObject.forGiftCard && (
            <GiftCardButton onClick={addProductToGiftCard}>
              Vytvoriť poukážku
            </GiftCardButton>
          )}
        </ActionHolder>
        <RibbonHolder stickLeft>
          {subCategoryObject.covidWarranty && (
            <CovidRibbon text="Covid-19 garancia" />
          )}
          {variants[0].bonus && <BonusRibbon text={`+Bonus`} />}
        </RibbonHolder>
        {variants[0].discount > 0 && (
          <DiscountRibbon text={`- ${Math.round(variants[0].discount)} %`} />
        )}
      </ProductItem>
      <div>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader
            style={{ width: '100%', padding: '.5rem 1rem' }}
            toggle={toggleModal}
          >
            Váš tovar bol úspešne pridaný do košíka
          </ModalHeader>
          <ModalBody>
            <StyledModalBody>
              {variants[0].images.length > 0 ? (
                <ModalImage
                  src={variants[0].images[0].path}
                  alt={variants[0].title}
                />
              ) : null}
              <ModalProductInfo>
                <ModalTitle>{title}</ModalTitle>
                <ModalTextSmall style={{ marginBottom: '1rem' }}>
                  {subCategory.title}
                </ModalTextSmall>
                {variants[0].discount > 0 ? (
                  <ModalText className="ml-2">
                    {formatPrice(
                      variants[0].price.value -
                        (variants[0].price.value * variants[0].discount) / 100
                    )}{' '}
                    {variants[0].price.currency}
                  </ModalText>
                ) : (
                  <ModalText>
                    {formatPrice(variants[0].price.value)}{' '}
                    {variants[0].price.currency}
                  </ModalText>
                )}
                <ModalTextSmall>Cena vrátane DPH 20%</ModalTextSmall>
              </ModalProductInfo>
            </StyledModalBody>
          </ModalBody>
          <ModalFooter
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <SecondaryButton onClick={toggleModal}>Nakupovať</SecondaryButton>
            <Link href="eshop/cart">
              <Button>
                <StyledShoppingCartIcon style={{ marginRight: '4px' }} />
                Do pokladne
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
