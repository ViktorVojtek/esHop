/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/categories.style';
import { CATEGORIES_QUERY } from '../../../../../graphql/query';
import Category from '../Category';
import { Context } from '../../../../../lib/state/Store';
import { Col } from 'reactstrap';

const CategoriesAside: FC = () => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);
  const { state, dispatch } = useContext(Context);
  const { category } = state;

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>loading</>;
  }

  const { categories } = data;

  const categoryButtons = categories.map(({ signFlag, _id, title }) => (
    <Col md="6" className="mb-2" key={signFlag}>
      <Category key={_id} title={title} id={_id} />
    </Col>
  ));
  return <>{categoryButtons}</>;
};

export default CategoriesAside;
