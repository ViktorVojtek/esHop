import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
export const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2126;
  padding: 1rem 3rem;
  @media(max-width: 992px){
    flex-direction: column;
  }
`;
export const Logo = styled.img`
  width: 200px;
  @media(max-width: 992px){
    margin-top: 1rem;
  }
`;
export const CreatedBy = styled.a`
  font-size: 0.8rem;
  color: rgb(159, 164, 175) !important;
  @media(max-width: 992px){
    margin-top: 1rem;
  }
`;

export const ScrollTop = styled.img`
  width: 32px;
  height: 32px;
  @media(max-width: 992px){
    margin-top: 1rem;
  }
`;