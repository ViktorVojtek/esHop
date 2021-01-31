import React from 'react';
import styled from 'styled-components';
import { scroller } from 'react-scroll';
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
import useViewport from '../../../../../shared/helpers/useViewport';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      overflow: 'hidden',
      '& .MuiListItem-container': {
        left: '100%',
        backgroundColor: 'white',
        animation: `$grow 0.5s ease-in-out forwards`,
      },
      '& .MuiListItem-gutters': {
        paddingLeft: '0',
      },
      '& .MuiListItemAvatar-root': {
        minWidth: '40px',
      },
      '& .MuiAvatar-root': {
        width: '32px',
        height: '32px',
        marginRight: '4px',
      },
      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
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
  padding: 16px 20px;
  width: 100%;
  color: black;
  border-left: 6px solid ${colors.primary};
`;
const H6 = styled.h6`
  font-weight: bold;
  margin: 0;
`;
const P = styled.p`
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ItemsSm = styled.div`
  display: none;
  width: 100%;
  @media (max-width: 768px) {
    display: block;
  }
`;

type ItemProps = {
  width?: number;
  align?: 'left' | 'right';
};

const HeaderItem = styled.h6<ItemProps>`
  width: ${({ width }) => (width ? `${width}%` : '25%')};
  text-align: ${({ align }) => (align ? `${align}` : 'left')};
  font-weight: bold;
  padding-bottom: 4px;
  border-bottom: solid 1px black;
`;

const BodyItem = styled.h6<ItemProps>`
  width: ${({ width }) => (width ? `${width}%` : '25%')};
  text-align: ${({ align }) => (align ? `${align}` : 'left')};
  display: flex;
  align-items: center;
  margin: 0;
`;

const BodyItemSm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.primary} !important;
`;

const StyledIconButton = styled(IconButton)`
  @media (max-width: 768px) {
    display: none !important;
  }
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

  const { width } = useViewport();

  const handleChangeTab = (newValue: number) => {
    setValue(newValue);
    if (width < 769) {
      handleScroll();
    }
  };

  const getPrice = (items) => {
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      price += items[i].price * items[i].count;
    }
    return price;
  };

  const handleScroll = () => {
    scroller.scrollTo('content', {
      duration: 500,
      delay: 50,
      smooth: true,
      offset: -120,
    });
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
        <Col md={3} xs={6}>
          <ButtonWithIcon className="mb-2" onClick={() => handleChangeTab(0)}>
            <EuroIcon style={{ marginRight: '6px' }} />
            <span>Peniaze</span>
          </ButtonWithIcon>
        </Col>
        <Col md={3} xs={6}>
          <ButtonWithIcon className="mb-2" onClick={() => handleChangeTab(1)}>
            <RoomServiceIcon style={{ marginRight: '6px' }} />
            <span>Procedúry</span>
          </ButtonWithIcon>
        </Col>
        <Col md={3} xs={6}>
          <ButtonWithIcon className="mb-2" onClick={() => handleChangeTab(2)}>
            <AirlineSeatIndividualSuiteIcon style={{ marginRight: '6px' }} />
            <span>Pobyty</span>
          </ButtonWithIcon>
        </Col>
        <Col md={3} xs={6}>
          <ButtonWithIcon className="mb-2" onClick={() => handleChangeTab(3)}>
            <FeaturedPlayListIcon style={{ marginRight: '6px' }} />
            <span>Permanentky</span>
          </ButtonWithIcon>
        </Col>
        <Col md={12}>
          <StyledPaper elevation={3}>
            <Items>
              <HeaderItem width={40}>Zvolený obsah poukážky</HeaderItem>
              <HeaderItem width={20}>Množstvo</HeaderItem>
              <HeaderItem>Jednotková cena</HeaderItem>
              <HeaderItem width={15}>Cena spolu</HeaderItem>
              <HeaderItem width={5} />
            </Items>
            <ItemsSm>
              <H6>Zvolený obsah poukážky</H6>
            </ItemsSm>
            <>
              {priceValue || services.length > 0 ? (
                <List className={classes.root}>
                  {services.map((item, i) => {
                    return (
                      <ListItem key={i}>
                        <Items>
                          <BodyItem width={40}>
                            <ListItemAvatar>
                              <StyledAvatar>
                                {item.type === 'procedura' && (
                                  <RoomServiceIcon />
                                )}
                                {item.type === 'pobyt' && (
                                  <AirlineSeatIndividualSuiteIcon />
                                )}
                                {item.type === 'permanentka' && (
                                  <FeaturedPlayListIcon />
                                )}
                              </StyledAvatar>
                            </ListItemAvatar>
                            <ListItemText>{item.title}</ListItemText>
                          </BodyItem>
                          <BodyItem width={20}>{`${item.count} x`}</BodyItem>
                          <BodyItem>{`${formatPrice(item.price)} €`}</BodyItem>
                          <BodyItem width={15}>
                            {`${formatPrice(item.price * item.count)} €`}
                          </BodyItem>
                        </Items>
                        <ItemsSm>
                          <BodyItemSm>
                            <div style={{ width: '100%' }}>
                              <BodyItemSm
                                style={{ justifyContent: 'space-between' }}
                              >
                                <H6>{item.title}</H6>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => removeProcedure(i)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </BodyItemSm>
                              <P>
                                Počet: <span>{`${item.count} x`}</span>
                              </P>
                              <P>
                                Jednotková cena:{' '}
                                <span>{`${formatPrice(item.price)} €`}</span>
                              </P>
                              <P>
                                Cena spolu:{' '}
                                <span>{`${formatPrice(
                                  item.count * item.price
                                )} €`}</span>
                              </P>
                            </div>
                          </BodyItemSm>
                        </ItemsSm>
                        <StyledIconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeProcedure(i)}
                        >
                          <DeleteIcon />
                        </StyledIconButton>
                      </ListItem>
                    );
                  })}
                  {priceValue > 0 && (
                    <ListItem>
                      <Items>
                        <BodyItem width={40}>
                          <ListItemAvatar>
                            <StyledAvatar>
                              <EuroIcon />
                            </StyledAvatar>
                          </ListItemAvatar>
                          <ListItemText>Suma</ListItemText>
                        </BodyItem>
                        <BodyItem width={20}>1 x</BodyItem>
                        <BodyItem>{`${formatPrice(priceValue)} €`}</BodyItem>
                        <BodyItem width={15}>
                          {`${formatPrice(priceValue)} €`}
                        </BodyItem>
                      </Items>
                      <ItemsSm>
                        <BodyItemSm style={{ justifyContent: 'space-between' }}>
                          <H6>Suma</H6>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removePriceValue()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </BodyItemSm>
                        <BodyItemSm>Počet: 1 x</BodyItemSm>
                        <BodyItemSm>
                          {`Cena spolu: ${formatPrice(priceValue)} €`}
                        </BodyItemSm>
                      </ItemsSm>
                      <StyledIconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removePriceValue()}
                      >
                        <DeleteIcon />
                      </StyledIconButton>
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
                  Obsah darčekovej poukážky je prázdny.
                </H6>
              )}
              <H6
                style={{
                  textAlign: 'right',
                  marginTop: '12px',
                  textTransform: 'uppercase',
                }}
              >
                Spolu:{' '}
                <span style={{ marginLeft: '12px' }}>
                  {formatPrice(totalPrice)}
                </span>{' '}
                €
              </H6>
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
