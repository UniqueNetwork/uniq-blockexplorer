import React, { useCallback } from 'react';
import { Icon } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import usePagination, { DOTS } from '../hooks/usePagination';

interface PaginationProps {
  count: number // total number of elements in DB
  pageSize?: number // how many elements we present per single page
  onPageChange: (page: number) => void // fetch new page data
  siblingCount?: number // how many pages to show, the rest will be "..."
  currentPage?: number
}

// TODO: can be string (when DOTS)
const PageNumberComponent = (props: {
  pageNumber: number | string
  currentPage: number
  onPageChanged: (newPage: number) => void
}) => {
  const { currentPage, onPageChanged, pageNumber } = props;

  const onPagePillClick = useCallback(
    () => {
      onPageChanged(pageNumber as number);
    },
    [onPageChanged, pageNumber]
  );

  if (pageNumber === DOTS) {
    return <li>...</li>;
  }

  // Render our Page Pills
  return (
    // highlight if selected
    <li
      className={pageNumber === currentPage ? 'active' : ''}
      key={pageNumber}
      onClick={onPagePillClick}
    >
      {pageNumber}
    </li>
  );
};

const PaginationComponent = ({
  count,
  currentPage = 1,
  onPageChange,
  pageSize = 10,
  siblingCount = 2
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    total: count
  });
  const lastPage =
    (paginationRange?.length > 1 && paginationRange[paginationRange.length - 1]) || null;

  const onPageChanged = useCallback((newPage: number) => {
    onPageChange(newPage);
  }, [pageSize, onPageChange]);

  const onNext = useCallback(() => {
    if (currentPage === lastPage || count < pageSize) return;
    onPageChanged(currentPage + 1);
  }, [currentPage, lastPage, count, pageSize, onPageChanged]);

  const onPrevious = useCallback(() => {
    if (currentPage < 2 || count < pageSize) return;
    onPageChanged(currentPage - 1);
  }, [currentPage, count, pageSize, onPageChanged]);

  return (
    <PaginationWrapper>
      <div>{count} items</div>
      {count > pageSize && (
        <PageNumbersWrapper>
          <li
            key={'prev'}
            onClick={onPrevious}
          >
            <Icon
              color={currentPage === 1 ? '#ABB6C1' : '#040B1D'}
              name={'carret-right'}
              size={12}
            />
          </li>
          {paginationRange.map((pageNumber, index) => (
            <PageNumberComponent
              currentPage={currentPage}
              key={pageNumber === DOTS ? `${DOTS}_${index}` : pageNumber}
              onPageChanged={onPageChanged}
              pageNumber={pageNumber}
            />
          ))}
          {/* TODO: disabled={currentPage === lastPage} */}
          <li
            key={'next'}
            onClick={onNext}
          >
            <Icon
              color={currentPage === lastPage || count < pageSize ? '#ABB6C1' : '#040B1D'}
              name={'carret-right'}
              size={12}
            />
          </li>
        </PageNumbersWrapper>
      )}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start !important;
    row-gap: calc(var(--gap) * 1.5);
  }
`;

const PageNumbersWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;

  li:last-child, li:first-child {
    padding: 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:first-child {
    transform: rotate(180deg);
  }

  li {
    padding: 4px 6px;
    min-width: 18px;
    text-align: center;
    cursor: pointer;

    &.active {
      border: 1px solid var(--primary-500);
      color: var(--white-color);
      background-color: var(--primary-500);
      border-radius: 4px;
      cursor: default;
    }
  }
`;

export default PaginationComponent;
