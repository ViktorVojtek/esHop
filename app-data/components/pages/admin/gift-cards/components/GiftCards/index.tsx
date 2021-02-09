import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GIFTCARDS_QUERY } from '../../../../../../graphql/query';
import { Button, IconButton, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { REMOVE_GIFTCARD_MUTATION } from '../../../../../../graphql/mutation';
import { GiftCardType } from '../..';
import DeleteIcon from '@material-ui/icons/Delete';

const TitleHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const GiftCardsHolder = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  margin: 16px;
`;

const GiftCards = () => {
  const { error, loading, data } = useQuery(GIFTCARDS_QUERY);

  const [removeGiftCard] = useMutation(REMOVE_GIFTCARD_MUTATION, {
    refetchQueries: [{ query: GIFTCARDS_QUERY }],
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { giftCards } = data;

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeGiftCard({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  return giftCards && giftCards.length > 0 ? (
    <GiftCardsHolder>
      {giftCards.map((giftCard: GiftCardType) => {
        return (
          <StyledPaper elevation={3} key={giftCard.title}>
            <TitleHolder>
              <h5>{giftCard.title}</h5>
              <IconButton
                onClick={() => handleRemoveItem(giftCard._id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </TitleHolder>
            {giftCard.image.path && (
              <img
                style={{ maxWidth: '200px' }}
                src={giftCard.image.path}
                alt={giftCard.title}
              />
            )}
          </StyledPaper>
        );
      })}
    </GiftCardsHolder>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">Neboli vytvorené žiadne darčekové poukážky.</p>
    </div>
  );
};

export default GiftCards;
