import { ReactNode } from 'react';

export interface IModal {
  message: string;
  title?: string;
  children: ReactNode;
}
