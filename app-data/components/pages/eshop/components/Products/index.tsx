import React, { useContext, useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
// Global state management context
import { Context } from '../../../../../lib/state/Store';
import { CustomPagination } from '../../../../../shared/components/Pagination';
import { useSiteStyles } from '../../../../../shared/design/style';
import Product from '../../../../../shared/types/Product.types';
import { VariantOfProduct } from '../../../../../shared/types/Store.types';
import { SubCategoryType } from '../../../admin/settings/subcategory';
// Component fullfill the filtered products
import ProductFill from './components/ProductsFill';
import { ProductsSkeleton } from './components/ProductsSkeleton';

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
  loading: boolean;
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
  loading,
}) => {
  const styles = useSiteStyles();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    dispatch,
    state: { subCategory },
  } = useContext(Context);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [subCategory]);

  useEffect(() => {
    setProductsToShow(
      filteredProducts.slice((currentPage - 1) * 12, currentPage * 12)
    );
  }, [currentPage, filteredProducts]);

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
    let searchedProducts = [...products];
    let newArray = searchedProducts.filter((item) =>
      item.title.toLocaleLowerCase().includes(compareString.toLocaleLowerCase())
    );
    setFilteredProducts(newArray);
  }, [compareString]);

  return (
    <>
      <Col lg={9} className="my-4">
        {loading && <ProductsSkeleton />}
        <Element name="products">
          <ProductFill
            products={productsToShow}
            addProduct={handleAddProductToCart}
            subCategories={subCategories}
          />
        </Element>
      </Col>
      {filteredProducts.length > 12 && (
        <div className="text-center w-100">
          <CustomPagination
            className={styles.paginationBlog}
            pageCount={Math.ceil(filteredProducts.length / 12)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default Products;
