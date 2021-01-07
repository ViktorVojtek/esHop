import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../../../../shared/design';

type descElType = {
  height: number;
  animationSpeed: number;
};

const ShadowOverlay = styled.div`
  background-image: linear-gradient(to bottom, transparent, #fff);
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  height: 60px;
`;

const DescEl = styled.div<descElType>`
  overflow: hidden;
  max-height: ${({ height }) => (height ? `${height}px` : '100px')};
  transition: ${({ animationSpeed }) =>
    animationSpeed ? `max-height ${animationSpeed}ms linear` : '300ms'};
`;

const P = styled.p`
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
      console.log(descriptionElement.current);
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
      <DescEl height={height} animationSpeed={300}>
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
