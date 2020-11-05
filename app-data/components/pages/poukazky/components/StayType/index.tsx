import React, { useState, FC, useEffect } from 'react';
import { H3, H4, ItemText, Button, StyledCartLink } from '../../styles/index';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { SERVICES_QUERY } from '../../../../../graphql/query';
import { useQuery } from 'react-apollo';
import Service from '../../../../../shared/types/Service.types';
import Link from 'next/link';
import Procedures from '../Procedures';
import { IProductToCartData } from '../..';

type IITem = {
  title: string;
  price: number;
  count: number;
};

type IStayType = {
  handleProcedure: (items: IITem[]) => void;
  formData: IProductToCartData;
};

const StayType: FC<IStayType> = ({ handleProcedure, formData }) => {
  const [modal, setModal] = useState(false);
  const { loading, error, data } = useQuery(SERVICES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <Spinner color="primary" />;
  }

  const addProcedure = (service) => {
    const sameArray = formData.services.filter(
      (item) => item.title === service.title
    );
    const diffArray = formData.services.filter(
      (item) => item.title !== service.title
    );
    if (sameArray.length > 0) {
      let mergeCount = Number(service.count) + Number(sameArray[0].count);
      service.count = mergeCount;
    }
    const newArray = [...diffArray, service];
    handleProcedure(newArray);
  };

  const { services } = data;

  const toggle = () => setModal(!modal);

  const pobyty: JSX.Element[] = services.map((item: Service) => {
    const handleAddProcedure = () => {
      let service = {
        title: item.title,
        price: item.price.value,
        count: 1,
      };
      addProcedure(service);
    };
    return (
      item.subCategory.title === 'Pobyty' && (
        <Col
          key={item.title}
          md="4"
          sm="6"
          xs="12"
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <ItemText>{item.title}</ItemText>
          <div className="d-flex w-100 mb-4 justify-content-between">
            <Button type="button" onClick={handleAddProcedure}>
              Pridať
            </Button>
            <Link
              href={{ pathname: '/eshop/service', query: { id: item._id } }}
            >
              <StyledCartLink>Detail</StyledCartLink>
            </Link>
          </div>
        </Col>
      )
    );
  });

  const procedury = services.map((item: Service) => {
    return (
      item.subCategory.title === 'Procedúry' && (
        <Procedures
          key={item.title}
          service={item}
          addProcedure={addProcedure}
        />
      )
    );
  });

  return (
    <>
      <Container>
        <H3>Vyberte si služby</H3>
        <H4 className="mb-4">Pobyty</H4>
        <Row>{pobyty}</Row>
        <H4 className="mb-4 mt-4">Voliteľné služby</H4>
        <Row>{procedury}</Row>
      </Container>
    </>
  );
};

export default StayType;
