import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { ILayout } from './TS/layout.interface';

import Navigation from '../Navigation/Site';

import { withSetCart } from '../../../../app-data/lib/state/Reducer';
import Footer from '../Footer';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';
import cookie from 'js-cookie';

const Layout: FC<ILayout> = ({ children }) => {
  const cookieAllowed = cookie.get('cookieAllowed');

  const setCookieAllowed = () => cookie.set('cookieAllowed', 'true');
  return (
    <>
      <Navigation />
      <div>{children}</div>
      <Footer />
      {!cookieAllowed && (
        <CookieConsent
          contentClasses="cookies"
          buttonText="Súhlasím"
          onAccept={setCookieAllowed}
          style={{
            background: 'white',
            color: '#00aeef',
            fontSize: '16px',
            borderTop: '1px solid #00aeef',
            padding: '0rem 2rem',
          }}
          buttonStyle={{
            background: '#00aeef',
            color: 'white',
            fontSize: '16px',
          }}
        >
          Táto webstránka používa súbory cookies, aby sme Vám mohli ponúknuť
          lepší zážitok z jej prezerania. Kliknutím na tlačidlo „SÚHLASÍM“ alebo
          ďalším používaním tejto webstránky vyjadrujete súhlas s používaním
          súborov cookies. Viac informácií o používaní súborov cookies nájdete{' '}
          <Link href="/pravidla-pouzivania-suborov-cookies">
            <a>tu</a>
          </Link>
          .
        </CookieConsent>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withSetCart(Layout);
