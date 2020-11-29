import React from 'react';

import { withAuthSync } from '../../../../app-data/lib/auth';
import PageContent from '../../../../app-data/components/pages/admin/settings/currency';
import { PageProps } from '../../Types/Page.types';

const CurrencyPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <PageContent role={role} />
);

export default withAuthSync(CurrencyPage);
