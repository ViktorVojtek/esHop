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
  Description,
  StyledCartBtn,
  VariantOption,
  VariantsSelect,
  Input,
  StyledModalLink,
  ActionPrice,
  Del,
  Label,
  RelatedTitle,
} from './styles/productDetail.style';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

import { Container, Row, Col } from 'reactstrap';
import ProductModal from '../../../../../shared/components/ProductModal';
// Types
import Product from '../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../shared/types/Store.types';

import { Context } from '../../../../../lib/state/Store';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';
import RelatedProducts from '../../../../../shared/components/RelatedProducts';

interface IProductDetailProps {
  product: Product;
}
interface IProductToCartData {
  id: string;
  count?: number;
  variant?: VariantOfProduct;
}

const ProductDetailBody: React.FC<IProductDetailProps> = ({ product }) => {
  // product prop destruct
  const { _id, variants, title, subCategory } = product;

  // hooks used in components
  const productCountRef = useRef(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(Context);

  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    variables: { subCategoryId: subCategory.id },
  });
  useEffect(() => {
    if (data) {
      let { products } = data;
      setRelatedProducts(products);
    }
  }, [data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const setRelatedProducts = (products: Product[]) => {
    console.log(products);
    const filteredProducts = products.filter((item) => item._id !== _id);
    setProducts(filteredProducts);
  };
  const handleSetActiveVariant: (i: number) => void = (i) => {
    setActiveVariant(i);
  };

  const handleAddProductToCart: (data: IProductToCartData) => void = (data) => {
    const { id, variant } = data;

    dispatch({ type: 'ADD_TO_CART', payload: { id, variant } });
  };

  const handleSubmitProductToCart: (
    event: React.FormEvent<HTMLFormElement>
  ) => void = (event) => {
    event.preventDefault();

    const count: number = +productCountRef.current.value as number;
    const { price, title, images, discount } = variants[activeVariant];

    handleAddProductToCart({
      id: _id,
      variant: {
        count,
        discount,
        price,
        title,
        images,
      },
    });
    dispatch({ type: 'SET_PRODUCT_MODAL', payload: true });
  };

  const variantOptions: JSX.Element[] = variants.map(({ title }) => (
    <VariantOption key={title} value={title}>
      {title}
    </VariantOption>
  ));

  return (
    <Wrapper>
      <Container>
        <form onSubmit={handleSubmitProductToCart}>
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
              <Title>{title}</Title>
              {variants.length > 1 && (
                <VariantTitle>{variants[activeVariant].title}</VariantTitle>
              )}
              {variants[activeVariant].discount > 0 ? (
                <Price>
                  <Del>
                    {variants[activeVariant].price.value}
                    {variants[activeVariant].price.currency}
                  </Del>
                  <ActionPrice className="ml-2">
                    {variants[activeVariant].price.value -
                      (variants[activeVariant].price.value *
                        variants[activeVariant].discount) /
                        100}
                    {variants[activeVariant].price.currency}
                  </ActionPrice>
                </Price>
              ) : (
                <Price>
                  {variants[activeVariant].price.value}
                  {variants[activeVariant].price.currency}
                </Price>
              )}
              <Description>{variants[activeVariant].description}</Description>{' '}
              {variants.length > 1 && (
                <VariantsSelect
                  id="variants"
                  name="variants"
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const idx: number = event.currentTarget.selectedIndex;

                    handleSetActiveVariant(idx);
                  }}
                >
                  {variantOptions}
                </VariantsSelect>
              )}
              <Label className="mt-4">Počet</Label>
              <Input
                type="number"
                className="mb-4"
                defaultValue={1}
                step={1}
                ref={productCountRef}
              />
              <StyledCartBtn type="submit">Vložiť do košíka</StyledCartBtn>
            </Col>
          </Row>
        </form>
      </Container>
      <Container>
        <RelatedTitle>Súvisiace produkty</RelatedTitle>
        <RelatedProducts products={products} />
      </Container>
      <ProductModal
        message="Pokračujte v nákupe alebo do pokladne."
        title="Produkt bol pridaný do košíka"
      >
        <Link href="cart">
          <StyledModalLink color="primary">Do pokladne</StyledModalLink>
        </Link>
        <Link href="/eshop">
          <StyledModalLink color="primary">Nakupovať</StyledModalLink>
        </Link>
      </ProductModal>
    </Wrapper>
  );
};

export default ProductDetailBody;
