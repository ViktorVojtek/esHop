import React, {
  useState,
  useContext,
  useRef,
  ChangeEvent,
  useEffect,
} from 'react';
import {
  Wrapper,
  Image,
  Title,
  TitleMobile,
  VariantTitle,
  Price,
  DetailInfo,
  VariantOption,
  VariantsSelect,
  Input,
  ActionPrice,
  Del,
  Label,
  RelatedTitle,
  NotInStock,
} from './styles/productDetail.style';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// Types
import Product from '../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../shared/types/Store.types';

import { Context } from '../../../../../lib/state/Store';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import RelatedProducts from '../../../../../shared/components/RelatedProducts';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { Button, colors, ProductButton } from '../../../../../shared/design';
import DescriptionEl from './Description';
import RelatedProductSkeleton from '../../../../../shared/components/RelatedProducts/Skeleton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';
import { SubCategoryType } from '../../../admin/settings/subcategory';
import { useRouter } from 'next/router';

const ButtonsHolder = styled.div`
  display: flex;
  flex-flow: row wrap;
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
  margin: 0;
`;
const ModalTextSmall = styled.p`
  color: #4a4a4a;
  font-size: 0.85rem;
  margin: 0;
`;
const ModalTextBigger = styled.p`
  color: black;
  font-size: 1.1rem;
  margin: 0;
`;
const ModalImage = styled.img`
  width: 150px;
  max-width: 50%;
  margin-bottom: 16px;
`;

const ModalButton = styled(Button)`
  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`;

const StyledShoppingCartIcon = styled(ShoppingCartIcon)`
  color: white;
  @media (max-width: 330px) {
    display: none !important;
  }
`;

const StyledProductButton = styled(ProductButton)`
  @media (max-width: 576px) {
    display: block;
  }
`;

const Holder = styled.div`
  display: flex;
  alignitems: 'flex-end';
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

interface IProductDetailProps {
  product: Product;
  subCategory: SubCategoryType;
}
interface IProductToCartData {
  id: string;
  count?: number;
  variant?: VariantOfProduct;
  isEnvelopeSize: boolean;
  title: string;
}

const ProductDetailBody: React.FC<IProductDetailProps> = ({
  product,
  subCategory,
}) => {
  // product prop destruct
  const { _id, variants, title, isEnvelopeSize } = product;
  const mainTitle = title;
  // hooks used in components
  const router = useRouter();
  const productCountRef = useRef(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const { dispatch } = useContext(Context);

  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    variables: { subCategoryId: subCategory._id },
  });
  useEffect(() => {
    if (data) {
      let { products } = data;
      console.log(data);
      setRelatedProducts(products.products);
    }
  }, [data]);

  if (error) {
    return <>{error.message}</>;
  }

  const toggleModal = () => setModal(!modal);

  const setRelatedProducts = (products: Product[]) => {
    const filteredProducts = products.filter((item) => item._id !== _id);
    setProducts(filteredProducts);
  };
  const handleSetActiveVariant: (i: number) => void = (i) => {
    setActiveVariant(i);
  };

  const handleAddProductToCart: (data: IProductToCartData) => void = (data) => {
    const { id, variant, isEnvelopeSize, title } = data;

    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, variant, isEnvelopeSize, title },
    });
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
        title === variants[activeVariant].title
          ? title
          : `${title}, ${variants[activeVariant].title}`,
      price: getPrice(variants[activeVariant]),
      count: 1,
      type: 'product',
      id: product._id,
      variantTitle: variants[activeVariant].title,
      variantNumber: activeVariant,
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

  const handleSubmitProductToCart: (
    event: React.FormEvent<HTMLFormElement>
  ) => void = (event) => {
    event.preventDefault();

    const count: number = +productCountRef.current.value as number;
    const { price, title, images, discount, productCode, inStock } = variants[
      activeVariant
    ];

    handleAddProductToCart({
      id: _id,
      variant: {
        count,
        discount,
        price,
        title,
        images,
        productCode,
      },
      isEnvelopeSize,
      title: mainTitle,
    });
    toggleModal();
  };

  const variantOptions: JSX.Element[] = variants.map(({ title }) => (
    <VariantOption key={title} value={title}>
      {title}
    </VariantOption>
  ));

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col md="6">
            <TitleMobile className="mb-3">{title}</TitleMobile>
            {variants[activeVariant].images.length > 0 ? (
              <Image
                src={variants[activeVariant].images[0].path}
                alt={variants[activeVariant].title}
                className="mb-3"
              />
            ) : null}
          </Col>
          <Col md="6">
            <DetailInfo>
              <Title>{title}</Title>
              {variants.length > 1 && (
                <VariantTitle>{variants[activeVariant].title}</VariantTitle>
              )}
              {variants[activeVariant].bonus && (
                <VariantTitle style={{ color: 'red', fontSize: '1.1rem' }}>
                  {variants[activeVariant].bonus}
                </VariantTitle>
              )}
              {variants[activeVariant].discount > 0 ? (
                <Price style={{ marginBottom: '.25rem' }}>
                  <Del>
                    {formatPrice(variants[activeVariant].price.value)}{' '}
                    {variants[activeVariant].price.currency}
                  </Del>
                  <ActionPrice className="ml-2">
                    {formatPrice(
                      variants[activeVariant].price.value -
                        (variants[activeVariant].price.value *
                          variants[activeVariant].discount) /
                          100
                    )}{' '}
                    {variants[activeVariant].price.currency}
                  </ActionPrice>
                </Price>
              ) : (
                <Price>
                  {formatPrice(variants[activeVariant].price.value)}{' '}
                  {variants[activeVariant].price.currency}
                </Price>
              )}
              {variants[activeVariant].inStock < 1 && (
                <NotInStock>Produkt nie je dostupný na sklade!</NotInStock>
              )}
              <ButtonsHolder>
                {subCategory.forSale ? (
                  <form onSubmit={handleSubmitProductToCart}>
                    {variants.length > 1 && (
                      <>
                        <VariantsSelect
                          id="variants"
                          name="variants"
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            const idx: number =
                              event.currentTarget.selectedIndex;

                            handleSetActiveVariant(idx);
                          }}
                        >
                          {variantOptions}
                        </VariantsSelect>
                      </>
                    )}
                    <Holder>
                      <div>
                        <Label className="mt-2">Počet</Label>
                        <Input
                          type="number"
                          defaultValue={1}
                          min={1}
                          step={1}
                          ref={productCountRef}
                        />
                      </div>
                      <StyledProductButton type="submit">
                        Vložiť do košíka
                      </StyledProductButton>

                      {subCategory.forGiftCard && (
                        <StyledProductButton
                          style={{ marginRight: '8px' }}
                          onClick={handleAddProductToGiftCard}
                        >
                          Vytvoriť poukážku
                        </StyledProductButton>
                      )}
                    </Holder>
                  </form>
                ) : (
                  <>
                    {variants.length > 1 && (
                      <div className="w-100 mt-2">
                        <VariantsSelect
                          id="variants"
                          name="variants"
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            const idx: number =
                              event.currentTarget.selectedIndex;

                            handleSetActiveVariant(idx);
                          }}
                        >
                          {variantOptions}
                        </VariantsSelect>
                      </div>
                    )}

                    {subCategory.forGiftCard && (
                      <StyledProductButton
                        style={{ marginRight: '8px' }}
                        onClick={handleAddProductToGiftCard}
                      >
                        Vytvoriť poukážku
                      </StyledProductButton>
                    )}
                    <Link
                      href={{
                        pathname: `/rezervacia`,
                        query: { service: title },
                      }}
                    >
                      <StyledProductButton>Rezervovať</StyledProductButton>
                    </Link>
                  </>
                )}
              </ButtonsHolder>
              <VariantTitle className="mt-4">Popis produktu</VariantTitle>
              <DescriptionEl variant={variants[activeVariant]} />
            </DetailInfo>
          </Col>
        </Row>
      </Container>
      <Container>
        <RelatedTitle>Súvisiace produkty</RelatedTitle>
        {loading ? (
          <RelatedProductSkeleton />
        ) : (
          <RelatedProducts products={products} />
        )}
      </Container>
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
                {variants[activeVariant].discount > 0 ? (
                  <ModalText>
                    {formatPrice(
                      variants[activeVariant].price.value -
                        (variants[activeVariant].price.value *
                          variants[0].discount) /
                          100
                    )}{' '}
                    {variants[activeVariant].price.currency}
                  </ModalText>
                ) : (
                  <ModalText>
                    {formatPrice(variants[activeVariant].price.value)}{' '}
                    {variants[activeVariant].price.currency}
                  </ModalText>
                )}
                <ModalTextSmall>Cena vrátane DPH 20%</ModalTextSmall>
                <ModalText style={{ marginBottom: '1rem' }}>
                  Počet:{' '}
                  <span>
                    {productCountRef.current && productCountRef.current.value}
                  </span>
                </ModalText>
                <ModalTextBigger>
                  Cena spolu:{' '}
                  {productCountRef.current && (
                    <span>
                      {variants[activeVariant].discount > 0 ? (
                        <span>
                          {formatPrice(
                            (variants[activeVariant].price.value -
                              (variants[activeVariant].price.value *
                                variants[0].discount) /
                                100) *
                              productCountRef.current.value
                          )}{' '}
                          {variants[activeVariant].price.currency}
                        </span>
                      ) : (
                        <span>
                          {formatPrice(
                            variants[activeVariant].price.value *
                              productCountRef.current.value
                          )}{' '}
                          {variants[activeVariant].price.currency}
                        </span>
                      )}
                    </span>
                  )}
                </ModalTextBigger>
              </ModalProductInfo>
            </StyledModalBody>
          </ModalBody>
          <ModalFooter
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '.75rem 0',
            }}
          >
            <Button onClick={toggleModal}>Nakupovať</Button>
            <Link href="/eshop/cart">
              <Button>
                <StyledShoppingCartIcon style={{ marginRight: '4px' }} />
                Do pokladne
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default ProductDetailBody;
