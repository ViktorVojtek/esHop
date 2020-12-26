import React from 'react';
import FreeDeliveryContentPage from '../../../../app-data/components/pages/admin/settings/freedelivery';

import { withAuthSync } from '../../../../app-data/lib/auth';
import { PageProps } from '../../../../app-data/shared/types/Page.types';

const FreeDeliveryPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <FreeDeliveryContentPage role={role} />
);

export default withAuthSync(FreeDeliveryPage);
