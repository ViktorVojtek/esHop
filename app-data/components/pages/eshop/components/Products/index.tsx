import React, { useContext, useEffect, useState } from 'react';
import PaginationComponent from 'react-reactstrap-pagination';
import { Element } from 'react-scroll';
import { Row } from 'reactstrap';
import styled from 'styled-components';
// Global state management context
import { Context } from '../../../../../lib/state/Store';
import Product from '../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../shared/types/Store.types';
import { SubCategoryType } from '../../../admin/settings/subcategory';
// Component fullfill the filtered products
import ProductFill from './components/ProductsFill';

const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const P = styled.p`
  font-weight: bold;
  margin-right: 24px;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;

interface IProductsProps {
  products: Product[];
  compareString: string;
  subCategories: SubCategoryType[];
}
interface IProductToCartData {
  id: string;
  count?: number;
  variants?: VariantOfProduct;
  isEnvelopeSize?: boolean;
  title: string;
}
const productsCount = 12;
const Products: React.FC<IProductsProps> = ({
  products,
  compareString,
  subCategories,
}) => {
  const [pageSize, setPageSize] = useState(productsCount);
  const [selectedPage, setSelectedPage] = useState(1);
  const [paginationProducts, setPaginationProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showenProducts, setShowenProducts] = useState(0);
  const {
    dispatch,
    state: { subCategory },
  } = useContext(Context);

  const handleAddProductToCart: (data: IProductToCartData) => void = (data) => {
    const { id, variants, isEnvelopeSize, title } = data;
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, variant: variants, isEnvelopeSize, title },
    });
  };
  /* const handleRemoveProductFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }; */
  useEffect(() => {
    setTotalItems(products.length);
    setPaginationProducts(
      products.slice(
        (selectedPage - 1) * productsCount,
        selectedPage * productsCount
      )
    );
    let totalProducts = products.length;
    let productsToShow = paginationProducts.length;
    dispatch({ type: 'SET_PRODUCTS_TOTAL_COUNT', payload: { totalProducts } });
    dispatch({
      type: 'SET_PRODUCTS_TO_SHOW_COUNT',
      payload: { productsToShow },
    });
  }, [products, selectedPage]);

  useEffect(() => {
    setSelectedPage(1);
  }, [subCategory]);

  useEffect(() => {
    setShowenProducts(
      paginationProducts.length + (selectedPage - 1) * productsCount
    );
  }, [paginationProducts]);

  const handleSelected = (selectedPage: number) => {
    setSelectedPage(selectedPage);
  };
  useEffect(() => {
    let searchedProducts = [...products];
    let newArray = searchedProducts.filter((item) =>
      item.title.toLocaleLowerCase().includes(compareString.toLocaleLowerCase())
    );
    setTotalItems(newArray.length);
    setPaginationProducts(newArray);
  }, [compareString]);

  return (
    <>
      <Row>
        <Element name="products">
          <ProductFill
            products={paginationProducts}
            addProduct={handleAddProductToCart}
            subCategories={subCategories}
          />
        </Element>
      </Row>
      <Row>
        <PaginationWrapper>
          <P>{`Zobrazuje ${showenProducts} z ${totalItems}`}</P>
          <PaginationComponent
            size="sm"
            totalItems={totalItems}
            pageSize={pageSize}
            onSelect={handleSelected}
            firstPageText="Prvá"
            previousPageText="Dozadu"
            nextPageText="Dopredu"
            lastPageText="Posledná"
            defaultActivePage={selectedPage}
          />
        </PaginationWrapper>
      </Row>
    </>
  );
};

export default Products;
