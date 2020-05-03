import * as React from 'react';
import Link from 'next/link';
import { Col } from 'reactstrap';

// Styled Components
import {
  PriceHolder, Price, ProductImg, ProductItem, ProductBody, StyledProductTitle,
} from './styles/products.style';

// type Product
import Product from '../../types/Products.type';

interface IProductsFillProps {
  products: Product[],
  addProduct: (id: string, count: Number) => void,
  removeProduct: (id: string) => void
}

interface IProductTitle {
  id: string,
  title: string
}
const ProductTitle: React.FC<IProductTitle> = ({ id, title }) => (
  <StyledProductTitle>
    <Link href={{ pathname: '/eshop/product/', query: { id } }}>
      <a>{title}</a>
    </Link>
  </StyledProductTitle>
);
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
  removeProduct
}) => {
  const elements = products.map((item: Product) => {
    const {
      _id,
      description,
      images,
      shortDescription,
      title,
      variant,
    } = item;
  
    return (
      <Col className="col-12" key={_id}>
        <ProductItem>
          {
            images.length > 0
              ? (
                <Link href={{ pathname: '/eshop/product/', query: { id: _id } }}>
                  <a>
                    <ProductImg src={images[0].path} alt={title} />
                  </a>
                </Link>
              ) : null
          }
          <ProductBody>
            <ProductTitle id={_id} title={title} />
            <p>{shortDescription}</p>
            <PriceHolder>
              <Price>
                {
                  variant.length > 0
                    ? `${variant[0].price.value} ${variant[0].price.currencySign}`
                    : 'Produkt neexistuje'
                }
              </Price>
              {/* TODO: Style it by following graphic design */}
              <button
                type="button"
                onClick={() => addProduct(_id,  1)}
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => removeProduct(_id)}
              >
                Remove from cart
              </button>
            </PriceHolder>
          </ProductBody>
        </ProductItem>
      </Col>
    );
  });

  return (
    <React.Fragment>
      {elements}
    </React.Fragment>
  );
};

export default ProductsFill;
