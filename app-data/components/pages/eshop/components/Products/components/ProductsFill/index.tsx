import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { useIsClient } from '../../../../../../../lib/util/app.util';
import { ProductUI } from '../../../../../../../shared/components/Product';
// Styled Components
import { StyledProductTitle } from './styles/products.style';
// type Product
import {
  IProductsFillProps,
  IProductTitle,
  IProductUI,
} from './types/ProductFill.types';

const ProductTitle: React.FC<IProductTitle> = ({ slug, title }) => {
  return (
    <Link href={{ pathname: `/eshop/produkt/${slug}` }}>
      <a>
        <StyledProductTitle>{title}</StyledProductTitle>
      </a>
    </Link>
  );
};

const ProductUIItem = forwardRef<
  HTMLAnchorElement & HTMLDivElement,
  IProductUI
>((props: IProductUI, ref) => {
  const router = useRouter();
  const { product, addProduct, subCategoriesList } = props;
  const { _id, variants, subCategory, title, isEnvelopeSize, slug } = product;
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
        title === variants[0].title ? title : `${title}, ${variants[0].title}`,
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
    <ProductUI
      product={product}
      subCategoryObject={subCategoryObject}
      addProduct={handleAddProductToCart}
      addProductToGiftCard={handleAddProductToGiftCard}
      modal={modal}
      toggleModal={toggleModal}
    />
  );
});
const ProductsFill: React.FC<IProductsFillProps> = ({
  products,
  addProduct,
  subCategories,
}) => {
  const elements: JSX.Element[] = products.map((item: any) => {
    const { _id } = item;
    return (
      <ProductUIItem
        key={_id}
        subCategoriesList={subCategories}
        product={item}
        addProduct={addProduct}
      />
    );
  });

  return (
    <Container>
      <Row>{elements}</Row>
    </Container>
  );
};

export default ProductsFill;
