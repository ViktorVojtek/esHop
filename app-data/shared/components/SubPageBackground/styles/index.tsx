import styled from 'styled-components';

interface IImageUrl {
  imageUrl?: string;
}

export const Wrapper = styled.div<IImageUrl>`
  position: relative;
  width: 100%;
  height: 240px;
  background-image: ${({ imageUrl }) =>imageUrl ? `url(${imageUrl})` : '0'};
  background-size: cover;
  margin-bottom: 2rem;
`;

export const Fade = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 174, 239, 0.27);
  display: flex;
  align-items: center;
`;

export const H1 = styled.h1`
  font-family: MuseoSans-300;
  font-weight: bold;
  color: white;
`;