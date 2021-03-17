import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../design';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

type IBonusRibbon = {
  text: string;
};

const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
  color: white;
  margin-left: 4px;
  width: 16px !important;
  height: 16px !important;
`;

const RibbonElement = styled.div`
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  color: white;
  padding: 3px 8px;
  position: relative;
  -webkit-filter: drop-shadow(0 0.5rem 0.3em rgba(0, 0, 0, 0.5));
  transform: translate3d(0, 0, 0);
  background: linear-gradient(to bottom, ${colors.error} 0%, #d82929 100%);
  line-height: 1.25rem;
  margin-bottom: 8px;
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-bottom: 13px solid #d82929;
    border-top: 13px solid ${colors.error};
    position: absolute;
    top: 0px;
    right: -10px;
  }
`;

export const CovidRibbon = (props: IBonusRibbon) => {
  const { text } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RibbonElement onClick={handleClickOpen}>
        {text}
        <StyledInfoOutlinedIcon />
      </RibbonElement>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="covid-dialog"
        aria-describedby="covid-description"
        disableScrollLock={true}
      >
        <DialogTitle id="covid-dialog">COVID-19 garancia pobytu</DialogTitle>
        <DialogContent>
          <DialogContentText id="covid-description">
            Rezervujte si svoj pobyt s istotou! Garantujeme vám, že o nič
            neprídete!
            <br /> Z dôvodu pandémie a opatreniam súvisiacich so zamedzením
            šírenia ochorenia Covid-19, vám poskytujeme{' '}
            <strong>„Covid garanciu“</strong>. Pokiaľ bude situácia kvôli
            Covid-19 aj naďalej nepriaznivá, vrátime vám peniaze alebo
            flexibilne ponúkneme iný termín ubytovania.
            <ul className="mt-4">
              <li>
                <strong>Garancia vrátenia peňazí</strong>
              </li>
              <li>
                <strong>Garancia poskytnutia iného termínu pobytu</strong>
              </li>
              <li>
                <strong>Garancia prednostného kontaktovania</strong>
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ fontWeight: 'bold' }}
          >
            Zavrieť
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
