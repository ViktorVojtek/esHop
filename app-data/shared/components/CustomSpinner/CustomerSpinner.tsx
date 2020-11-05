import React from 'react';
import { Spinner } from 'reactstrap';

import styled from 'styled-components';

export const Holder = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomSpinner = () => (
  <Holder>
    <Spinner color="primary" style={{ width: '48px', height: '48px' }} />
  </Holder>
);

export default CustomSpinner;
