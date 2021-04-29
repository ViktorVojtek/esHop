import styled, { createGlobalStyle } from 'styled-components';
import { colors } from '../design';

export { default as Reset } from './lib/reset.style';
export { Container, Col, Row } from './lib/grid.style';

export const WrapperFlex = styled.div`
  display: flex;
  justify-content: flex-start;

  & > div {
    margin-right: 0.5rem;

    &:last-child {
      margin-right: 0.5rem;
      width: 100%;
    }
  }
`;

export const LinkButton = styled.a`
  color: white;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 6px;
  background-color: rgb(255, 77, 125);
  padding: 0.75rem 1.5rem;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    text-decoration: none;
    color: white;
    box-shadow: 0px 0px 12px 0px rgb(255, 77, 125);
  }
`;

export default createGlobalStyle`
@import url('https://unpkg.com/aos@3.0.0-beta.6/dist/aos.css') screen;

@font-face {
  font-family: Franchise-CE;
  src: url("/static/fonts/Franchise-CE.otf");
  font-display: swap;
  font-style: normal;
  font-weight: 600;
}
 @font-face {
  font-family: Engagement-Regular;
  src: url(/fonts/Engagement-Regular.ttf);
  font-display: swap;
  font-style: cursive;
 }

 *{
   outline: none !important;
 }

   .modal-open {
    overflow-y: scroll;
    padding-right: 0!important;
   }

   @media (max-width: 992px) {
    .container {
      max-width:calc(100% - 20px);
      margin: 0px 10px;
    }
 }
  #mainPageNavigation{
    @media(max-width: 992px){
      display:none;
    }
  }
   #navigation{
     display: block;
     box-shadow: -1px -1px 10px 3px #e6e6e6;
     @media(max-width: 992px){
       display:none;
     }
   }
   #mobileNavigation{
     display:none;
    @media(max-width: 992px){
      display:block;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0;
      z-index: 999;
      background-color: white;
      width: 100%;
      box-shadow: -1px -1px 10px 3px #e6e6e6;
      padding: 16px 32px;
    }
   }
   .hideMobile{
     @media(max-width: 768px){
       display:none !important;
     }
   }
   .showMobileTable{
     display: none !important;
    @media(max-width: 768px){
      display: table !important;
    }
   }

  * {
    font-family: 'Open Sans', sans-serif;
  }
  .admin * {
    font-family:Roboto;
  }
  #__next{
    overflow: hidden;
  }
  .modal-content{
    padding: 1rem;
    .modal-title{
      color: black;
      font-size: 1.25rem;
      font-weight: bold;
      width: 100%;
      text-align: center;
    }
  }
  .mt-8{
    margin-top: 4rem;
  }
  .pagination{
    .active{
      button{
        background-color:${colors.primary} !important;
        border-color: ${colors.primary} !important;
      }
    }
  }
  .dropdown{
    .dropdown-menu{
      width: 100%;
    }
  }
  .form-check-input{
    margin-top: .2rem;
  }
  .nav-link{
    color: #5e8796;
    font-weight: 500;
    font-size: 1rem;
    &:hover{
      color: rgb(24, 28, 39);
    }
    @media(max-width: 992px){
      font-size: 0.7rem;
      text-align: left;
    }
    @media(max-width: 768px){
      font-size: 2rem;
    }
    @media(max-width: 530px){
      font-size: 1.6rem;
    }
  }
  .carousel-image{
    width: 100%;
    height: 60vh;
    background-size: cover;
    background-position: center center;
    @media(max-width: 1550px){
      height: 450px;
    }
    @media(max-width: 1200px){
      height: 400px;
    }
    @media(max-width: 920px){
      height: 300px;
    }
  }
  .letter-spacing-1{
    letter-spacing: 1px;
  }
  a{
    text-decoration: none !important;
  }
  h1{
    font-size: 3.75rem;
    @media(max-width: 1550px){
      font-size: 3rem;
    }
    @media(max-width: 1200px){
      font-size: 2rem;
    }
  }
  h3{
    font-size: 1.5rem;
  }
  h4{
    font-size: 1.375rem;
  }
  .active-text{
    p{
      color:#ff4d7d;
      font-weight: bold;
    }
    @media(max-width: 768px){
      display: block;
    }
  }
  .innactive-text{
    @media(max-width: 768px){
      display: none;
    }
  }
  .active{
    color: white !important;
    background-color: #00aeef !important;
  }
  .carousel-indicators{
    li{
      background-color: grey !important;
    }
    .active{
      color: white !important;
      background-color: #262b39 !important;
    }
  }
  .not-active{
    color: white !important;
    &:hover{
      color: white !important;
    }
  }
  .navbar{
    padding: 0.75rem 7rem !important;
    background-color: #FFFFFF !important;
    box-shadow: -1px -1px 10px 2px #e6e6e6;
    @media(max-width: 1550px){
      padding: 0.75rem 4rem !important;
    }
    @media(max-width: 992px){
      padding: 0.75rem 2rem !important;
    }
  }

  .navbar-main{
    padding: 20px 120px !important;
    background-color: white;
    box-shadow: none;
    transition: all .3s ease-out;
    @media(max-width: 1300px){
      padding: 20px 60px !important;
    }
    .nav-link-main{
      color: black !important;
      margin-right: 16px;
    }
    .nav-link-main-active{
      color: #ff0000 !important;
      &:before {
        transform: scale(1,1);
      }
    }
  }
  .navbar-main.active{
    background-color: #FFFFFF !important;
    box-shadow: -1px -1px 10px 2px #e6e6e6;
    padding: 10px 120px !important;
  }
  
  .navbar-brand{
    margin-right: 0 !important;
  }
  .navbar-collapse{
    justify-content: flex-end;
    @media(max-width: 768px){
      justify-content: none;
      position: absolute;
      width: 100%;
      background: white;
      z-index: 1000;
      top: 100px;
      left: 0px;
    }
  }
  .navbar-nav{
    @media(max-width: 768px){
      align-items: start;
      margin-top: 2rem;
    }
  }
  .card-item{
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1) !important;
    user-select: none!important;
    backface-visibility: hidden;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
      box-shadow: 0 6px 7px 0 rgba(0,0,0,.15), 0 0 5px 0 rgba(0,0,0,.1) !important;
      transform: translate(-50%,50%) translateY(-4px);
    }
    @media(max-width: 576px){
      box-shadow: none !important;
      border: none !important;
      border-radius: 0px;
    }
  }
  .stay-item{
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1) !important;
    user-select: none!important;
    backface-visibility: hidden;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
      box-shadow: 0 6px 7px 0 rgba(0,0,0,.15), 0 0 5px 0 rgba(0,0,0,.1) !important;
      transform: translateY(calc(50% - 4px));
    }
    @media(max-width: 576px){
      box-shadow: none !important;
      border: none !important;
      border-radius: 0px;
    }
  }
  .button-link{
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1) !important;
    user-select: none!important;
    backface-visibility: hidden;
    display: inline-block;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
      box-shadow: 0 0px 8px 0 rgb(255,77,125), 0 0 8px 0 rgba(0,0,0,.1) !important;
      transform: translateY(-2px);
    }
  }
  .button-icon-white{
    cursor: pointer;
    user-select: none!important;
    backface-visibility: hidden;
    display: inline-block;
    transition-timing-function: cubic-bezier(.25,.1,.2,1);
    transition: all 0.3s ease-in-out !important;
    &:hover{
    transform: translateY(-2px);
    }
  }
  .cursor-pointer{
    cursor: pointer;
  }
  .nav-link-main{
    position: relative;
    transition: transform .5s cubic-bezier(1,.25,0,.75) 0s;
    font-family: 'Open Sans', sans-serif;
    color: #5e8796 !important;
    &:before {
      content: "";
      position: absolute;
      width: calc(100% - 1rem);
      height: 2px;
      bottom: 4px;
      display:block;
      background-color: #00aeef;
      transform: scale(0,1);
      -webkit-transition: transform 0.4s cubic-bezier(1,0,0,1);
      transition: transform 0.4s cubic-bezier(1,0,0,1);
      @media(max-width: 992px){
        width: 100%;
      }
    }
    &:hover:before {
      transform: scale(1,1);
    }
    &:hover{
      color: #ff0000 !important;
    }
    @media(max-width: 1300px){
      font-size: 0.9rem;
    }
  }
  .nav-link-main-active{
    color: #ff0000 !important;
    &:before {
      transform: scale(1,1);
    }
  }
  
  .product-image{
    overflow: hidden;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    position: relative;
    &:hover{
      .product-image-background{
        transform: scale(1.075);
      }
      .detail{
        background-color: rgba(0, 0, 0,0.05);
        svg, img{
          transform: scale(1);
        }
      }
    }
    .detail{
      position: absolute;
      width: 100%;
      height: 100%; 
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .4s ease-out;
      overflow: hidden;
    }
  }
  .navbar-toggler{
    outline: none !important;
  }
  .admin-logo{
    width: 200px;
  }
  .lsnav-head{
    font-size: 1.5rem;
    color: rgb(0, 174, 239);
    font-weight: bold;
  }
  .lsnav-link{
    font-size: 1rem !important;
    color: rgb(170, 174, 184) !important;
    font-weight: bold;
    transition: color .3s ease-out;
    &:hover{
      color: black !important;
    }
  }
  .list-group{
    max-width: 800px;
  }
  .list-group-item{
    border: none;
    box-shadow: 0px 0px 5px 0px #c5c5c5;
    margin: .5rem 0rem;
  }
  .table{
    th{
      border: none;
    }
  }
  .cookies{
    padding: 1rem 0rem;
  }
  .mobile-text-center{
    @media(max-width: 768px){
      text-align: center;
    }
  }
  .full-table{
    max-width: 800px;
    th{
      white-space: nowrap;
      vertical-align: center;
    }
  }
  .table th{
    vertical-align: middle;
  }
  .table td{
    vertical-align: middle;
  }
  .popover{
    .popover-header{
      ::before{border-bottom-color: #556cd6 !important;}
    }
    .arrow{
      ::before{border-bottom-color: #556cd6 !important;}
     ::after{border-bottom-color: #556cd6 !important;}
    }
  }
  .grecaptcha-badge { visibility: hidden; }
  .mobile-card{
    @media(max-width: 768px){
      margin-bottom: 66px;
    }
  }
  .swiper-container-vertical>.swiper-pagination-bullets{
    right: 0px;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 2px;
  }

  /* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #373a47;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.custom-bullet-container{
  .swiper-pagination-bullet, .swiper-pagination-bullet-active{
    background-color: white !important;
    width: 32px;
    height: 32px;
    opacity: 1;
    cursor: pointer;
    transition: transform .3s ease-out;
  }
  .swiper-pagination-bullet{
    transform: scale(.4);
    border: none;
  }
  .swiper-pagination-bullet-active{
    transform: scale(1);
    border: 3px solid white;
    background-color: #9bd0eb !important;
  }
  .recipe-bullet{
    background-color: white !important;
  }
}
.description-editor{
  border: 1px solid grey;
  border-radius: 4px;
  margin-bottom: 16px;
}
.full-width{
  @media(max-width: 992px){
    max-width: 100%;
    padding: 0;
  }
}
.swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
  background: none;
  border: 2px solid ${colors.primary};
}
`;
