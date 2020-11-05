import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-apollo';
import { Button } from 'reactstrap';
import {
  ADD_TO_MARKETING_LIST,
  REMOVE_FROM_MARKETING_LIST,
} from '../../../../graphql/mutation';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { H2, H6 } from '../mojaZona';

type IMarketingSection = {
  id: string;
  customer: {
    email: string;
    tel: string;
    firstName: string;
    lastName: string;
    marketing: boolean;
  };
};

const MarketingSection: FC<IMarketingSection> = ({ id, customer }) => {
  const [isMarketing, setIsMarketing] = useState(customer.marketing);
  console.log(isMarketing);

  const { enqueueSnackbar } = useSnackbar();

  const [addToMarketingList] = useMutation(ADD_TO_MARKETING_LIST, {
    refetchQueries: [{ query: CUSTOMER_QUERY, variables: { id: id } }],
  });
  const [removeFromMarketingList] = useMutation(REMOVE_FROM_MARKETING_LIST, {
    refetchQueries: [{ query: CUSTOMER_QUERY, variables: { id: id } }],
  });

  const handleRemoveFromMarketing: () => Promise<void> = async () => {
    try {
      await removeFromMarketingList({
        variables: {
          email: customer.email,
        },
      });
      enqueueSnackbar(`Odstránenie prebehlo úspešne`, {
        variant: 'success',
      });
      setIsMarketing(false);
    } catch (err) {
      enqueueSnackbar(`Nastala neočakávaná chyba`, {
        variant: 'error',
      });
    }
  };

  const handleAddToMarketing: () => Promise<void> = async () => {
    try {
      await addToMarketingList({
        variables: {
          marketingListData: {
            email: customer.email,
            tel: customer.tel,
            firstName: customer.firstName,
            lastName: customer.lastName,
          },
        },
      });

      setIsMarketing(true);
      enqueueSnackbar(`Súhlas prebehol úspešne.`, {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(`Nastala neočakávaná chyba`, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      {isMarketing ? (
        <div>
          <H6 style={{ marginTop: '0' }}>
            Zrušenie súhlasu na spracovanie osobných údajov na reklamné účely
          </H6>
          <Button
            style={{ background: 'red', border: 'none' }}
            onClick={handleRemoveFromMarketing}
          >
            Zrušiť súhlas
          </Button>
        </div>
      ) : (
        <div>
          <H6>Súhlasím so spracovaním osobných údajov na reklamné účely</H6>
          <Button
            style={{ background: '#28a745', border: 'none' }}
            onClick={handleAddToMarketing}
          >
            Súhlasím
          </Button>
        </div>
      )}
    </>
  );
};

export default MarketingSection;
