import React, { FC } from 'react';
import Service from '../../../../../shared/types/Service.types';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { useSnackbar } from 'notistack';
import InfoPopover from '../InfoPopover';
import {
  ActionPrice,
  Del,
  Holder,
  Item,
  IconsHolder,
  P,
  Price,
  StyledPaper,
  OverFlow,
} from '../../styles';
import { CartPlusIcon } from '../../../../../shared/design/icons';

type IItem = {
  title: string;
  price: number;
  count: number;
};

type IProcedures = {
  service: Service;
  addProcedure: (item: IItem) => void;
};

const Procedures: FC<IProcedures> = ({ service, addProcedure }) => {
  const { enqueueSnackbar } = useSnackbar();
  function getPrice(variant): number {
    if (variant.discount > 0) {
      return (
        variant.price.value - (variant.price.value * variant.discount) / 100
      );
    } else return variant.price.value;
  }

  const addService = () => {
    const item: IItem = {
      title: service.title,
      price: getPrice(service),
      count: 1,
    };
    addProcedure(item);
    enqueueSnackbar(`Pridané: ${service.title}`, {
      variant: 'success',
    });
  };

  //const toggle = () => setEnabled(!enabled);
  return (
    <StyledPaper elevation={3} url={service.img.path}>
      <OverFlow />
      <Item>
        <Holder style={{ marginBottom: '16px' }}>
          <P className="mb-0">{service.title}</P>
          <P>
            {service.discount > 0 ? (
              <Price>
                <Del>{`${formatPrice(service.price.value)} €`}</Del>
                <ActionPrice className="ml-2">
                  {formatPrice(
                    service.price.value -
                      (service.price.value * service.discount) / 100
                  )}{' '}
                  {`€`}
                </ActionPrice>
              </Price>
            ) : (
              <Price>
                {formatPrice(service.price.value)} {`€`}
              </Price>
            )}
          </P>
          <IconsHolder>
            <InfoPopover color="white" size={30} html={service.html} />
            <CartPlusIcon
              style={{ marginLeft: '24px' }}
              color="white"
              size={30}
              onClick={addService}
            />
          </IconsHolder>
        </Holder>
      </Item>
    </StyledPaper>
  );
};

export default Procedures;
