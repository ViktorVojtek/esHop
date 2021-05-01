import React from 'react';

const ReklamacnyFormular: () => JSX.Element = () => {
  return (
    <div style={{ height: '100vh' }}>
      <iframe
        src="/reklamacny_formular.pdf"
        title="Reklamačný formulár"
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default ReklamacnyFormular;
