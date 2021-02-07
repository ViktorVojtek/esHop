import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, fonts } from '../../../../../../shared/design';

type descElType = {
  height: number;
  animationSpeed: number;
};

const ShadowOverlay = styled.div`
  background-image: linear-gradient(to bottom, transparent, #fff);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
`;

const DescEl = styled.div<descElType>`
  overflow: hidden;
  position: relative;
  max-height: ${({ height }) => (height ? `${height}px` : '100px')};
  transition: ${({ animationSpeed }) =>
    animationSpeed ? `max-height ${animationSpeed}ms linear` : '300ms'};
`;

const P = styled.p`
  font-family: ${fonts.primary} !important;
  p {
    font-family: ${fonts.primary} !important;
    span {
      font-family: ${fonts.primary} !important;
    }
  }
  li {
    span {
      font-family: ${fonts.primary} !important;
    }
  }
`;

type DescriptionElType = {
  variant: any;
};

const DescriptionEl = (props: DescriptionElType) => {
  const { variant } = props;
  const [height, setHeight] = useState(160);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const descriptionElement = useRef(null);

  useEffect(() => {
    setHeight(160);
    setIsOpen(false);
    setDescriptionHeight(descriptionElement.current.offsetHeight);
  }, [variant, descriptionElement.current]);

  function renderDescription(description) {
    return { __html: description };
  }

  const toggle = () => {
    if (!isOpen) {
      if (descriptionElement.current) {
        setHeight(descriptionElement.current.offsetHeight);
        setIsOpen(true);
      }
    } else {
      setHeight(160);
      setIsOpen(false);
    }
  };

  return (
    <>
      <DescEl className="mt-4" height={height} animationSpeed={300}>
        <P
          ref={descriptionElement}
          dangerouslySetInnerHTML={renderDescription(variant.description)}
        />
        {descriptionHeight > 160 && !isOpen && <ShadowOverlay />}
      </DescEl>
      {descriptionHeight > 160 && (
        <Button className="mt-2" onClick={toggle}>
          {isOpen ? 'Zobraz menej' : 'Zobrazit viac'}
        </Button>
      )}
    </>
  );
};

export default DescriptionEl;
