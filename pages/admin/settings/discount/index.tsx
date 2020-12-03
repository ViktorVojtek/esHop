import React from 'react';

import { withAuthSync } from '../../../../app-data/lib/auth';
import { PageProps } from '../../../../app-data/shared/types/Page.types';
import DiscountContent from '../../../../app-data/components/pages/admin/settings/discount';

const DiscountPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <DiscountContent role={role} />
);

export default withAuthSync(DiscountPage);
