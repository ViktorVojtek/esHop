import React from 'react';

import { Container } from 'reactstrap';

const OdstupenieOdZmluvy: () => JSX.Element = () => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/vzorovy_formular_na_odstupenie_od_zmluvy.pdf"
        title="Vzorový formulár na odstúpenie od zmluvy"
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default OdstupenieOdZmluvy;
