import React from 'react';
import { PaginationContainer, PageButton } from '../styles/PaginationStyles';
import store from '../models/RootStore';
import { observer } from 'mobx-react-lite';

const generatePageNumbers = (totalPages: number, currentPage: number) => {
  const pageNumbers: (number | '...')[] = [];

  if (totalPages <= 1) return pageNumbers;

  pageNumbers.push(1);

  if (currentPage > 4) {
    pageNumbers.push('...');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 3) {
    pageNumbers.push('...');
  }

  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

const Pagination: React.FC = observer(() => {
  const totalCount = store.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / store.limit);
  const currentPage = Math.floor(store.offset / store.limit) + 1;
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  const handlePageChange = (pageNumber: number) => {
    store.setOffset((pageNumber - 1) * store.limit);
  };

  return (
    <PaginationContainer>
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
          <PageButton
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            isActive={currentPage === page}
          >
            {page}
          </PageButton>
        )
      )}
    </PaginationContainer>
  );
});

export default Pagination;
