import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Form = styled.form`
  margin: 0 auto;
  padding: 2rem;
  box-shadow: -1px 0px 10px 0px lightgrey;

  min-width: 300px;
`;

export const Button = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  width: 100%;
  &:hover {
    background-color: #00aeef;
  }
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #ececec;
  padding: 0.5rem 0.25rem;
  margin-bottom: 0.5rem;
`;

export const H3 = styled.h2`
  text-align: left;
  color: #5e8796;
  position: relative;
  font-size: 1.5rem !important;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  }
`;

export const H1 = styled.h2`
  text-align: left;
  color: black;
  position: relative;
  font-size: 2.5rem !important;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  }
`;

export const RegisterButton = styled.a`
  font-family: MuseoSans-300;
  color: #00aeef !important;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;

export const P = styled.p`
  font-family: MuseoSans-300;
`;
