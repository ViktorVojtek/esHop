import React from 'react';
import GiftCardsContentPage from '../../../app-data/components/pages/admin/gift-cards';

import { withAuthSync } from '../../../app-data/lib/auth';
import { PageProps } from '../../../app-data/shared/types/Page.types';

const GiftCardPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <GiftCardsContentPage role={role} />
);

export default withAuthSync(GiftCardPage);
