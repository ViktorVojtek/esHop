import styled from 'styled-components';

export const Img = styled.img`
  max-width: inherit;
`;

export const ImgPrevWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: .5rem;
  max-width: 250px;
`;

export const CloseBtn = styled.button`
  background-color: #C0392B;
  border: 0;
  border-radius: 50%;
  color: #FDFEFE;
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
`;
