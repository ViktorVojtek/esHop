import React from 'react';
import styled, { keyframes } from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EuroIcon from '@material-ui/icons/Euro';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import { ButtonWithIcon, colors } from '../../../../../shared/design';
import MoneyType from '../MoneyType';
import { IGiftCardData } from '../Stepper';
import ProceduresType from '../ProceduresType';
import StaysType from '../StaysType';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {
  Avatar,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Col, Row } from 'reactstrap';
import PermanentType from '../PermanentType';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      overflow: 'hidden',
      '& .MuiListItem-container': {
        left: '100%',
        backgroundColor: 'white',
        animation: `$grow 0.5s ease-in-out forwards`,
      },
    },
    '@keyframes grow': {
      '0%': {
        left: '100%',
      },
      '100%': {
        left: '0',
      },
    },
  })
);

const StyledPaper = styled(Paper)`
  margin-top: 16px;
  margin-bottom: 32px;
  padding-top: 16px;
  padding-bottom: 8px;
  width: 100%;
  color: black;
`;
const H6 = styled.h6`
  font-weight: bold;
  padding-left: 16px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.primary} !important;
`;

type ContentProps = {
  setFormData: React.Dispatch<React.SetStateAction<IGiftCardData>>;
  formData: IGiftCardData;
};

export default function Content(props: ContentProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { formData, setFormData } = props;
  const { services, priceValue, totalPrice } = formData;

  const handleChangeTab = (newValue: number) => {
    setValue(newValue);
  };

  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };

  const removeProcedure = (value: number) => {
    let newServices = [...services];
    newServices.splice(value, 1);
    setFormData({
      ...formData,
      totalPrice: formData.priceValue + getPrice(newServices),
      services: newServices,
    });
  };

  const removePriceValue = () => {
    setFormData({
      ...formData,
      priceValue: 0,
      totalPrice: formData.totalPrice - formData.priceValue,
    });
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <ButtonWithIcon onClick={() => handleChangeTab(0)}>
            <span>
              <EuroIcon style={{ marginRight: '6px' }} />
              Peniaze
            </span>
            <ControlPointIcon />
          </ButtonWithIcon>
        </Col>
        <Col md={3}>
          <ButtonWithIcon onClick={() => handleChangeTab(1)}>
            <span>
              <RoomServiceIcon style={{ marginRight: '6px' }} />
              Procedúry
            </span>
            <ControlPointIcon />
          </ButtonWithIcon>
        </Col>
        <Col md={3}>
          <ButtonWithIcon onClick={() => handleChangeTab(2)}>
            <span>
              <AirlineSeatIndividualSuiteIcon style={{ marginRight: '6px' }} />
              Pobyty
            </span>
            <ControlPointIcon />
          </ButtonWithIcon>
        </Col>
        <Col md={3}>
          <ButtonWithIcon onClick={() => handleChangeTab(3)}>
            <span>
              <FeaturedPlayListIcon style={{ marginRight: '6px' }} />
              Permanentky
            </span>
            <ControlPointIcon />
          </ButtonWithIcon>
        </Col>
        <Col md={6}>
          <StyledPaper elevation={3}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <H6>Zvolený obsah poukážky</H6>
              <H6
                style={{ marginRight: '15px' }}
              >{`Spolu: ${totalPrice} €`}</H6>
            </div>
            <>
              {priceValue || services.length > 0 ? (
                <List className={classes.root}>
                  {services.map((item, i) => {
                    return (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <StyledAvatar>
                            {item.type === 'procedura' && <RoomServiceIcon />}
                            {item.type === 'pobyt' && (
                              <AirlineSeatIndividualSuiteIcon />
                            )}
                            {item.type === 'permanentka' && (
                              <FeaturedPlayListIcon />
                            )}
                          </StyledAvatar>
                        </ListItemAvatar>
                        <ListItemText>{`${item.title} - ${formatPrice(
                          item.price
                        )} € x ${item.count}`}</ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeProcedure(i)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                  {priceValue > 0 && (
                    <ListItem>
                      <ListItemAvatar>
                        <StyledAvatar>
                          <EuroIcon />
                        </StyledAvatar>
                      </ListItemAvatar>
                      <ListItemText>{`Suma - ${formatPrice(
                        priceValue
                      )} €`}</ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removePriceValue()}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
              ) : (
                <H6
                  style={{
                    fontWeight: 'normal',
                    marginTop: '12px',
                    marginRight: '12px',
                  }}
                >
                  Obsah darčekovej poukážky je prádzny.
                </H6>
              )}
            </>
          </StyledPaper>
        </Col>
      </Row>

      {value === 0 && (
        <MoneyType formData={formData} setFormData={setFormData} />
      )}
      {value === 1 && (
        <ProceduresType formData={formData} setFormData={setFormData} />
      )}
      {value === 2 && (
        <StaysType formData={formData} setFormData={setFormData} />
      )}
      {value === 3 && (
        <PermanentType formData={formData} setFormData={setFormData} />
      )}
    </>
  );
}
