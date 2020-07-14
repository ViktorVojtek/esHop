import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row } from 'reactstrap';
import Proptypes from 'prop-types';
import Product from '../../../../../shared/types/Product.types';
import PaginationComponent from 'react-reactstrap-pagination';

// Graphql Query def
import { PRODUCTS_QUERY } from '../../../../../graphql/query';

// Global state management context
import { Context } from '../../../../../lib/state/Store';

// Component fullfill the filtered products
import ProductFill from './components/ProductsFill';

import { VariantOfProduct } from '../../../../../shared/types/Store.types';

interface IProductsProps {
  products: Product[];
  toggleModal: () => void;
}
interface IProductToCartData {
  id: string;
  count?: number;
  variants?: VariantOfProduct;
}
const productsCount = 16;
const Products: React.FC<IProductsProps> = ({ products, toggleModal }) => {
  const [pageSize, setPageSize] = useState(productsCount);
  const [selectedPage, setSelectedPage] = useState(1);
  const [paginationProducts, setPaginationProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showenProducts, setShowenProducts] = useState(0);
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    // fetchPolicy: 'network-only',
  });
  const { dispatch } = useContext(Context);

  const handleAddProductToCart: (data: IProductToCartData) => void = (data) => {
    const { id, variants } = data;

    dispatch({ type: 'ADD_TO_CART', payload: { id, variant: variants } });
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
    setShowenProducts(
      paginationProducts.length + (selectedPage - 1) * productsCount
    );
  }, [paginationProducts]);

  const handleSelected = (selectedPage: number) => {
    setSelectedPage(selectedPage);
  };

  return (
    <>
      <Row>
        <ProductFill
          products={paginationProducts}
          addProduct={handleAddProductToCart}
          toggleModal={toggleModal}
        />
      </Row>
      <Row>
        <div className="mt-4 w-100 d-flex justify-content-end align-items-center">
          <p className="mr-4">{`Zobrazuje ${showenProducts} z ${products.length}`}</p>
          <PaginationComponent
            size="sm"
            totalItems={totalItems}
            pageSize={pageSize}
            onSelect={handleSelected}
            firstPageText="Prvá"
            previousPageText="Dozadu"
            nextPageText="Dopredu"
            lastPageText="Posledná"
          />
        </div>
      </Row>
    </>
  );
};

export default Products;
