import styled from 'styled-components';
import { FilePdf } from '@styled-icons/fa-solid';

export const Wrapper = styled.div`
  margin-top: 160px;
  min-height: calc(100vh - 317px);
  @media (max-width: 768px) {
    margin-top: 120px;
  }
`;

export const P = styled.p`
  font-family: MuseoSans-300;
  margin-top: 1rem;
`;

export const H2 = styled.h3`
  margin-top: 32px;
`;

export const H6 = styled.h6`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const PDF = styled(FilePdf)`
  width: 30px;
  color: #007bff;
`;
