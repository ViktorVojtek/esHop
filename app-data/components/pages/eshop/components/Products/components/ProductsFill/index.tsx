import React, { useState } from 'react';
import Link from 'next/link';
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
import { Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// type Product
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from './types/ProductFill.types';
import ServiceUI from '../ServicesFill';
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
import { DiscountRibbon } from '../../../../../../../shared/components/Ribbon/DiscountRibbon';
import { RibbonHolder } from '../../../../../../../shared/components/Ribbon/RibbonHolder';
import { Button, ProductButton } from '../../../../../../../shared/design';
import { BonusRibbon } from '../../../../../../../shared/components/Ribbon/BonusRibbon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';

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
}) => {
  const isClient = useIsClient();
  const [modal, setModal] = useState(false);
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

  const toggleModal = () => setModal(!modal);
  return (
    <>
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
              <StyledShortDescription>
                {subCategory.title}
              </StyledShortDescription>
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
            <Button color="secondary" onClick={toggleModal}>
              Nakupovať
            </Button>
            <Link href="eshop/cart">
              <Button color="primary">
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
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const elements: JSX.Element[] = products.map((item: any) => {
    const { _id, variants } = item;
    return (
      <React.Fragment key={_id}>
        {variants !== undefined ? (
          <ProductUI product={item} addProduct={addProduct} />
        ) : (
          <ServiceUI product={item} />
        )}
      </React.Fragment>
    );
  });

  return <>{elements}</>;
};

export default ProductsFill;
