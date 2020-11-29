import React from 'react';

import { withAuthSync } from '../../../../app-data/lib/auth';
import { PageProps } from '../../Types/Page.types';
import SubcategoryContent from '../../../../app-data/components/pages/admin/settings/subcategory';

const SubcategoryPage: (props: PageProps) => JSX.Element = ({ role }) => (
  <SubcategoryContent role={role} />
);

export default withAuthSync(SubcategoryPage);
