import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    /**
    *** SIMPLE GRID
    *** (C) ZACH COLE 2016
    **/

   @font-face {
    font-family: MuseoSans-Thin;
    src: url(/public/fonts/MuseoSans-100.otf);
    font-display: swap;
    font-style: normal;
    font-weight: 100;
   }
   @font-face {
    font-family: MuseoSans-Thin-Italic;
    src: url(/public/fonts/MuseoSans-100Italic.otf);
    font-display: swap;
    font-style: italic;
    font-weight: 100;
   }
   @font-face {
    font-family: MuseoSans-Normal;
    src: url(/public/fonts/MuseoSans-300.otf);
    font-display: swap;
    font-style: normal;
    font-weight: 300;
   }
   @font-face {
    font-family: MuseoSans-Normal-Italic;
    src: url(/public/fonts/MuseoSans-300Italic.otf);
    font-display: swap;
    font-style: italic;
    font-weight: 300;
   }
   @font-face {
    font-family: MuseoSans-Bold;
    src: url(/public/fonts/MuseoSans-500.otf);
    font-display: swap;
    font-style: normal;
    font-weight: 500;
   }
   @font-face {
    font-family: MuseoSans-Bold-Italic;
    src: url(/public/fonts/MuseoSans-500Italic.otf);
    font-display: swap;
    font-style: italic;
    font-weight: 500;
   }

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
    font-family:MuseoSans-Bold;
    }

    h2 {
    font-size: 2rem;
    font-family:MuseoSans-Bold;
    }

    h3 {
    font-size: 1.375rem;
    font-family:MuseoSans-Bold;
    }

    h4 {
    font-size: 1.125rem;
    font-family:MuseoSans-Bold;
    }

    h5 {
    font-size: 1rem;
    font-family:MuseoSans-Bold;
    }

    h6 {
    font-size: 0.875rem;
    font-family:MuseoSans-Bold;
    }

    p {
    font-size: 1.125rem;
    font-weight: 200;
    line-height: 1.8;
    font-family:MuseoSans-Normal;
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
