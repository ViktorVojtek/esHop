import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    /**
    *** SIMPLE GRID
    *** (C) ZACH COLE 2016
    **/

    @import url(https://fonts.googleapis.com/css?family=Lato:400,300,300italic,400italic,700,700italic);

    /* UNIVERSAL */

    html,
    body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    font-size: 100%;
    }

    /* ROOT FONT STYLES */

    * {
    font-family: 'Lato', Helvetica, sans-serif;
    color: #333447;
    line-height: 1.5;
    }

    /* TYPOGRAPHY */

    h1 {
    font-size: 2.5rem;
    }

    h2 {
    font-size: 2rem;
    }

    h3 {
    font-size: 1.375rem;
    }

    h4 {
    font-size: 1.125rem;
    }

    h5 {
    font-size: 1rem;
    }

    h6 {
    font-size: 0.875rem;
    }

    p {
    font-size: 1.125rem;
    font-weight: 200;
    line-height: 1.8;
    }

    .font-light {
    font-weight: 300;
    }

    .font-regular {
    font-weight: 400;
    }

    .font-heavy {
    font-weight: 700;
    }

    /* POSITIONING */

    .left {
    text-align: left;
    }

    .right {
    text-align: right;
    }

    .center {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    }

    .justify {
    text-align: justify;
    }
`;
