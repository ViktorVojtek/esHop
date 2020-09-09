import { ReactNode } from 'react';

export interface IModal {
  children: ReactNode;
  title?: string;
  fn?: () => Promise<void> | void;
}
