import React, { FC } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { scrollTop } from '../../helpers/scrollTop';
type PaginationProps = {
  pageCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};

export const CustomPagination: FC<PaginationProps> = (props) => {
  const { pageCount, currentPage, setCurrentPage, className = '' } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    scrollTop();
    setCurrentPage(value);
  };

  return (
    <Pagination
      className={className}
      count={pageCount}
      page={currentPage}
      onChange={handleChange}
    />
  );
};
