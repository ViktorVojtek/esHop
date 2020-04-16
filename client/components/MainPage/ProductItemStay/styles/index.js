import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 10rem;
  @media(max-width: 1550px){
    padding-left: 40px;
    padding-right: 40px;
  }
`;
export const H2 = styled.h2`
  margin-top: 3rem;
`;
export const Text = styled.p`
  font-size: 1rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  width: 500px;
  margin-top: 1rem;
  letter-spacing: 1px;
  @media(max-width: 1200px){
    font-size: 0.75rem;
  }
  @media(max-width: 992px){
    width:100%;
  }
`;
export const Text2 = styled.p`
  font-size: 0.8rem;
  color: rgb(120, 125, 136);
  line-height: 1.2;
  width: 500px;
  margin-top: 1rem;
  letter-spacing: 1px;
  @media(max-width: 1200px){
    font-size: 0.75rem;
  }
  @media(max-width: 992px){
    width:100%;
  }
`;
export const Items = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 4rem;
  position: relative;
  @media(max-width: 1200px){
    margin-top: 6rem;
  }
  @media(max-width: 992px){
    flex-direction: column;
    margin-top: 2rem;
  }
`;

export const LeftItem = styled.div`
  width: 40%;
  position: relative;
  @media(max-width: 992px){
    width: 100%;
  }
`;

export const RightItem = styled.div`
  width: 60%;
  position: relative;
  @media(max-width: 992px){
    width: 75%;
  }
  @media(max-width: 992px){
    flex-direction: column;
    margin-top: 5rem;
    width: 100%;
    margin-bottom: 5rem;
  }
`;


export const ItemPhotoRight = styled.div`
  padding-top: 60%;
  position: relative;
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : '0')};
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
  top: -15%;
`;

export const TextArea = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0px;
  padding: 3rem;
  border-radius: 4px;
  right: 0;
  transform: translateY(50%);
  @media(max-width: 1550px){
    padding: 2rem;
  }
  @media(max-width: 992px){
    transform: translateY(55%);
    margin: 2rem;
  }
`;

export const ProductHeader = styled.h4`

`;

export const Gradient = styled.div`;
  position: absolute;
  background: linear-gradient(90deg, rgba(193,228,249,1) 0%, #f4f9ff 100%);
  width: 60%;
  height: 100%;
  top: 6%;
  right: 10%;
  @media(max-width: 992px){
    height: 85%;
    right:-80px;
    top: 21%;
  }
`;

export const Button = styled.button`
  font-size: 1.5rem;
  color: rgb(109, 114, 120);
  border:none;
  background: none;
  outline:none !important;
  margin-top: 1.5rem;
  position: relative;
  &:before {
    content: "";
    position: relative;
    width: 0px;
    height: 2px;
    bottom: 8px;
    background-color: rgb(109,114,120);
    display: inline-block;
    right: 8px;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
  &:hover{
    font-weight: bold;
    &:before {
      width: 40px;
    }
  }
  @media(max-width: 1200px){
    font-size: 1.2rem;
  }
  @media(max-width: 992px){
    width: 33%;
  }
  
`;
export const ButtonsHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  @media(max-width: 992px){
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
