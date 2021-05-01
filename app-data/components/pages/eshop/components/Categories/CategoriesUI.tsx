/* eslint-disable no-underscore-dangle */
import React, { FC, useContext, useEffect } from 'react';
import Category from '../Category';
import { useRouter } from 'next/router';
import { Context } from '../../../../../lib/state/Store';
import { Col, Row } from 'reactstrap';

type ICategoriesUIProps = {
  categories: any;
};

const CategoriesUI: FC<ICategoriesUIProps> = ({ categories }) => {
  const router = useRouter();
  const { dispatch } = useContext(Context);

  useEffect(() => {
    if (router.query.category) {
      categories.map((category) => {
        if (category.title === router.query.category) {
          dispatch({
            type: 'SET_CATEGORY',
            payload: { id: category._id, title: category.title },
          });
        }
      });
    }
  }, []);

  const categoryButtons = categories.map(({ signFlag, _id, title }) => (
    <Col md={6} lg={12} className="mb-2" key={signFlag}>
      <Category title={title} id={_id} />
    </Col>
  ));
  return <Row>{categoryButtons}</Row>;
};

export default CategoriesUI;
