import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { SUBCATEGORIES_QUERY } from '../../../../../graphql/query';
import { Button, colors } from '../../../../../shared/design';
import { SubCategoryType } from '../../../admin/settings/subcategory';

type StyledButtonProps = {
  active: boolean;
};

const StyledButton = styled(Button)<StyledButtonProps>`
  background-color: ${({ active }) =>
    active ? colors.primaryHover : colors.primary};
`;

type CategoryMenuProps = {
  handleChangeCategory: (category: string) => void;
  category: string;
};

export const CategoryMenu = (props: CategoryMenuProps): JSX.Element => {
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <>{error.message}</>;
  }
  const { subCategories } = data;

  const { handleChangeCategory, category } = props;

  return (
    <Row>
      {subCategories.map((subCategory: SubCategoryType) => {
        if (subCategory.forGiftCard) {
          return (
            <Col md={3} xs={6} key={subCategory.title}>
              <StyledButton
                className="mb-2 w-100"
                onClick={() => handleChangeCategory(subCategory._id)}
                active={category === subCategory._id}
              >
                {subCategory.title}
              </StyledButton>
            </Col>
          );
        }
      })}
      <Col md={3} xs={6}>
        <StyledButton
          className="mb-2 w-100"
          onClick={() => handleChangeCategory('Suma')}
          active={category === 'Suma'}
        >
          Peniaze
        </StyledButton>
      </Col>
    </Row>
  );
};
