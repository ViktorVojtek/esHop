import {
  createStyles,
  IconButton,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { InfoIcon } from '../../../../shared/design/icons';
import { Button } from '../../../../shared/design';
import styled from 'styled-components';

const Text = styled.div`
  font-family: MuseoSans-300 !important;
  p {
    font-family: MuseoSans-300 !important;
    span {
      font-family: MuseoSans-300 !important;
    }
  }
  li {
    span {
      font-family: MuseoSans-300 !important;
    }
  }
`;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      minWidth: '200px',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

function renderDescription(description) {
  return { __html: description };
}

type InfoPopoverProps = {
  html: string;
  color?: string;
  size?: number;
};

const InfoPopover = (props: InfoPopoverProps) => {
  const { html, color, size } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <div>
      <InfoIcon onClick={handleOpen} color={color} size={size} />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        disableScrollLock={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Detail služby
        </DialogTitle>
        <DialogContent dividers>
          <Text dangerouslySetInnerHTML={renderDescription(html)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zavrieť</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InfoPopover;
