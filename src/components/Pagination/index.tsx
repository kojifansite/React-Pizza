import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'; 

interface PaginationPrps {
  onChangePage: (page:number) => void,
  curPage: number
}

export const Pagination:React.FC<PaginationPrps> = ({ onChangePage, curPage }) => {
  // (number) => setCurPage(number)
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={curPage - 1}
      previousLabel='<'
    />
  );
};
