import { Tooltip } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import styled from 'styled-components';
import { useIsClient } from '../../../../../../../lib/util/app.util';
import { BonusRibbon } from '../../../../../../../shared/components/Ribbon/BonusRibbon';
import { DiscountRibbon } from '../../../../../../../shared/components/Ribbon/DiscountRibbon';
import { RibbonHolder } from '../../../../../../../shared/components/Ribbon/RibbonHolder';
import { Button } from '../../../../../../../shared/design';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
// Styled Components
import {
  ActionButton,
  ActionHolder,
  ActionIconsHolder,
  ActionPrice,
  Del,
  EyeDetail,
  ImageWrap,
  Price,
  PriceHolder,
  ProductBody,
  ProductImg,
  ProductItem,
  StyledCardGiftcardOutlinedIcon,
  StyledProductTitle,
  StyledShortDescription,
} from './styles/products.style';
// type Product
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from './types/ProductFill.types';

const StyledFlipMove = styled(FlipMove)`
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 866px) {
    justify-content: center;
  }
`;

const StyledModalBody = styled.div`
  display: flex;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ModalProductInfo = styled.div`
  margin-left: 24px;
  @media (max-width: 576px) {
    margin-left: 0;
  }
`;
const ModalTitle = styled.h6`
  color: black;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;
const ModalText = styled.p`
  color: black;
  font-size: 0.95rem;
  font-weight: bold;
  margin: 0;
`;
const ModalTextSmall = styled.p`
  color: black;
  font-size: 0.85rem;
  margin: 0;
`;
const ModalImage = styled.img`
  width: 150px;
  max-width: 50%;
  margin-bottom: 16px;
`;

const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
  color: white;
`;

const ProductTitle: React.FC<IProductTitle> = ({ slug, title }) => {
  return (
    <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
      <a>
        <StyledProductTitle>{title}</StyledProductTitle>
      </a>
    </Link>
  );
};

const ProductUI = forwardRef<HTMLAnchorElement & HTMLDivElement, IProductUI>(
  (props: IProductUI, ref) => {
    const router = useRouter();
    const { product, addProduct, subCategoriesList } = props;
    const { _id, variants, subCategory, title, isEnvelopeSize, slug } = product;
    const isClient = useIsClient();
    const [modal, setModal] = useState(false);

    const [subCategoryObject] = subCategoriesList.filter(
      (item) => item._id === subCategory.id
    );

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
      setModal(true);
    };

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
          title === variants[0].title
            ? title
            : `${title}, ${variants[0].title}`,
        price: getPrice(variants[0]),
        count: 1,
        type: 'product',
        id: product._id,
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

    const toggleModal = () => setModal(!modal);
    return (
      <>
        <ProductItem elevation={2} ref={ref}>
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
              <StyledShortDescription>
                {subCategory.title}
              </StyledShortDescription>
            </ProductBody>
          </div>
          <ActionHolder>
            <ActionIconsHolder>
              {subCategoryObject.forGiftCard && (
                <Tooltip
                  title="Darčeková poukážka"
                  aria-label="darcekova-poukazka"
                >
                  <StyledCardGiftcardOutlinedIcon
                    onClick={handleAddProductToGiftCard}
                  />
                </Tooltip>
              )}
            </ActionIconsHolder>
            {subCategoryObject.forSale ? (
              <>
                {variants.length > 1 ? (
                  <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
                    <ActionButton>Vložiť do košíka</ActionButton>
                  </Link>
                ) : (
                  <ActionButton
                    type="button"
                    onClick={() => (isClient ? handleAddProductToCart() : null)}
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
          </ActionHolder>
          <RibbonHolder>
            {variants[0].discount > 0 && (
              <DiscountRibbon
                text={`ZĽAVA ${Math.round(variants[0].discount)} %`}
              />
            )}
            {variants[0].bonus && <BonusRibbon text={`+Bonus`} />}
          </RibbonHolder>
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
              <Button onClick={toggleModal}>Nakupovať</Button>
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
  }
);
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
  subCategories,
}) => {
  const elements: JSX.Element[] = products.map((item: any) => {
    const { _id } = item;
    return (
      <ProductUI
        key={_id}
        subCategoriesList={subCategories}
        product={item}
        addProduct={addProduct}
      />
    );
  });

  return (
    <StyledFlipMove enterAnimation="none" leaveAnimation="none">
      {elements}
    </StyledFlipMove>
  );
};

export default ProductsFill;
