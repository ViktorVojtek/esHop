import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 160px;
  min-height: calc(100vh - 693px);
`;

export const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
`;

export const H4 = styled.h4`
  font-size: 2rem;
  color: black;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 120px;
`;

export const Button = styled.button`
  background-color: #00aeefb8;
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

export const ButtonLink = styled.a`
  background-color: #00aeefb8;
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
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  display: inline-block;
  text-align: center;

  cursor: pointer;
  &:hover {
    background-color: #00aeef;
  }
`;

export const Input = styled.input`
  border-radius: 0.25rem;
  border: 1px solid #ececec;
  padding: 0.5rem 0.25rem;
  margin-bottom: 0.5rem;
  max-width: 200px;
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
  color: #00aeef !important;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;

export const P = styled.p``;
