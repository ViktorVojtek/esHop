import React, { FC, useState } from 'react';
import Link from 'next/link';

import {
  IProductUI,
  IProductsFillProps,
  IProductTitle,
} from '../../../components/pages/eshop/components/Products/components/ProductsFill/types/ProductFill.types';

import { ProductsSkeleton } from '../../../components/pages/eshop/components/Products/components/ProductsSkeleton';
import { useQuery } from 'react-apollo';
import { SUBCATEGORIES_QUERY } from '../../../graphql/query';
import { StyledProductTitle } from '../../../components/pages/eshop/components/Products/components/ProductsFill/styles/products.style';
import { useRouter } from 'next/router';
import { ProductUI } from '../Product';
import Product from '../../types/Product.types';
import { StyledCol } from '../Product/style';

const ProductTitle: React.FC<IProductTitle> = ({ slug, title }) => {
  return (
    <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
      <a>
        <StyledProductTitle>{title}</StyledProductTitle>
      </a>
    </Link>
  );
};

const FeatureProduct: FC<IProductUI> = ({
  product,
  subCategoriesList,
  addProduct,
}) => {
  const router = useRouter();
  const [subCategoryObject] = subCategoriesList.filter(
    (item) => item._id === product.subCategory.id
  );

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

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
        product.title === product.variants[0].title
          ? product.title
          : `${product.title}, ${product.variants[0].title}`,
      price: getPrice(product.variants[0]),
      count: 1,
      type: 'product',
      id: product._id,
      variantTitle: product.variants[0].title,
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

  return (
    <StyledCol lg={3} md={6} sm={12}>
      <ProductUI
        product={product}
        subCategoryObject={subCategoryObject}
        addProduct={addProduct}
        addProductToGiftCard={handleAddProductToGiftCard}
        modal={modal}
        toggleModal={toggleModal}
      />
    </StyledCol>
  );
};
const FeaturecProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
}) => {
  const { data, loading, error } = useQuery(SUBCATEGORIES_QUERY, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <ProductsSkeleton />;
  }
  const { subCategories } = data;
  const elements: JSX.Element[] = products.slice(0, 8).map((item: Product) => {
    const { _id } = item;

    return (
      <FeatureProduct
        subCategoriesList={subCategories}
        product={item}
        addProduct={addProduct}
        key={_id}
      />
    );
  });

  return <>{elements}</>;
};

export default FeaturecProductsFill;
