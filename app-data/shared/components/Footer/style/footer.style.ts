import styled, { StyledComponent } from 'styled-components';

export const Wrapper: StyledComponent<'div', any, {}, never> = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

export const BottomDiv: StyledComponent<'div', any, {}, never> = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2126;
  padding: 1rem 3rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const Logo: StyledComponent<'img', any, {}, never> = styled.img`
  width: 240px;

  @media (max-width: 992px) {
    margin-top: 1rem;
  }
`;
export const CreatedBy: StyledComponent<'a', any, {}, never> = styled.a`
  font-size: 0.8rem;
  color: rgb(159, 164, 175) !important;
  text-align: center;

  @media (max-width: 992px) {
    margin-top: 1rem;
  }
`;

export const ScrollTop: StyledComponent<'img', any, {}, never> = styled.img`
  width: 32px;
  height: 32px;

  @media (max-width: 992px) {
    margin-top: 1rem;
  }
`;
