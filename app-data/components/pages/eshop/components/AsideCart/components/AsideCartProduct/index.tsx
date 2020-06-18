import React, { FC, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Context } from '../../../../../../../lib/state/Store';
import { PRODUCT_QUERY } from '../../../../../../../graphql/query';
import { ProductImage } from '../../../../../../../shared/types/Product.types';
import { HeadWrapper, P, Image, TD, Button } from './styles/asideCartProductStyle';

interface ICartProductTableRow {
  id: string;
  count: number;
  variantTitle: string;
  image: ProductImage;
}

let textCount = "";
const AsideCartProduct: FC<ICartProductTableRow> = ({
  id,
  count,
  variantTitle,
  image,
}) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Context);
  const { data } = useQuery(PRODUCT_QUERY, {
    variables: { id },
  });

  if (data) {
    const {
      // Destructed product's data fetched from server
      product: { title, variants: variants },
    } = data;

    // product variant destructed as prodVariantTitle as it is variant title populated from product variants array
    const { title: prodVariantTitle } = variants
      .filter((variant: any) => variant.title === variantTitle)
      .pop();

    // variant price object destructed as price and currency
    const {
      price: { value: itemPrice, currency: currency },
    } = variants.filter((variant: any) => variant.title === variantTitle).pop();

    const handleAddProduct: (id: string) => void = (id) => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();

      const prodItemVariant = {
        ...cartItemData.variant,
        count: 1,
      };

      dispatch({
        type: 'ADD_TO_CART',
        payload: { id, variant: prodItemVariant },
      });

    };

    const handleRemoveProduct: (id: string) => void = (id) => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();

        console.log(id);
      const prodItemVariant = {
        ...cartItemData.variant,
        count: cartItemData.variant.count - 1,
      };

      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id, variant: prodItemVariant },
      });

    };
    
    handleTextCount(count);

    function handleTextCount(count: number){
      if(count === 1){
        return textCount = "kus";
      }
      else if(count > 1 && count < 5){
        return textCount = "kusy";
      }
      else
        return textCount = "kusov";
    };

    return (
      <div className="mt-4">
        <HeadWrapper className="d-flex">
          <P>{title}</P>
          <Image src={image.path} />
        </HeadWrapper>
        <table>
          <tbody>
            <tr>
              <TD>Variant:</TD>
              <td>{prodVariantTitle}</td>
            </tr>
            <tr>
              <TD>Cena:</TD>
              <td>{`${itemPrice},-${currency}`}</td>
            </tr>
            <tr>
              <TD>Počet:</TD>
              <td>{`${count} ${textCount}`}</td>
            </tr>
            <tr>
              <TD>Spolu:</TD>
              <td>{`${count * itemPrice},-${currency}`}</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <Button onClick={() => handleRemoveProduct(id)}>Odobrať</Button>
          <Button onClick={() => handleAddProduct(id)}>Pridať</Button>
        </div>
      </div>
    );
  }

  return null;
};

export default AsideCartProduct;
