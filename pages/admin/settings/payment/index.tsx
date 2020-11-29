import React from 'react';

import { withAuthSync } from '../../../../app-data/lib/auth';
import { PageProps } from '../../Types/Page.types';
import PaymentContent from '../../../../app-data/components/pages/admin/settings/payment';

const PaymentPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <PaymentContent role={role} />
);

export default withAuthSync(PaymentPage);
