import React from 'react';

import { withAuthSync } from '../../../../app-data/lib/auth';
import { PageProps } from '../../Types/Page.types';
import PageContent from '../../../../app-data/components/pages/admin/settings/delivery';

const DeliveryPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <PageContent role={role} />
);

export default withAuthSync(DeliveryPage);
