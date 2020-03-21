import styled from 'styled-components';

export const NavWrapper = styled.div`
  background-color: #283747;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #D6DBDF;
  display: flex;
  align-items: center;
`;

export const Nav = styled.ul`
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0 auto;
  padding: 0 .5rem;
  width: 100%;
`;

export const NavItem = styled.li`
  color: #FBFCFC;
  margin-right: .5rem;

  &:last-child {
    margin-left: auto;
  }
`;
