import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ProductVariant } from '../../types/Product.types';
import styled from 'styled-components';

type VariantModalProps = {
  variants: ProductVariant[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (i: number) => void;
};

export const VariantModal = (props: VariantModalProps) => {
  const { variants, isOpen, setIsOpen, onClick } = props;
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <StyledDialog
        open={isOpen}
        onClose={handleClose}
        scroll={scroll}
        disableScrollLock={true}
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Zvoľte variant</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Container className="mt-4">
            <Row>
              {variants.map((variant, index) => (
                <StyledCol md={6} sm={12} key={index}>
                  <Item onClick={() => onClick(index)}>
                    <Image src={variant.images[0].path} alt="Variant image" />
                    <Title>{variant.title}</Title>
                  </Item>
                </StyledCol>
              ))}
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zrušiť
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

const StyledDialog = styled(Dialog)`
  @media (max-width: 576px) {
    .MuiDialog-paper {
      margin: 0;
      max-height: 100%;
    }
    .MuiDialogContent-root {
      padding: 0;
    }
  }
`;

const Item = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease-out;
  border: 1px solid rgba(0, 0, 0, 0.15);
  &:hover {
    box-shadow: 5px 5px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StyledCol = styled(Col)`
  margin-bottom: 24px;
`;

const Image = styled.img`
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 24px;
`;
