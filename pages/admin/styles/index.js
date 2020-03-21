import styled from 'styled-components';

export const WrapperFlex = styled.div`
  display: flex;
  justify-content: flex-start;

  & > div {
    margin-right: .5rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;